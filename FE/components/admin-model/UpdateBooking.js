"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdateBooking = ({ openUpdate, setOpenUpdate, bookingIdToUpdate, refreshBookings }) => {
  const [bookingInfo, setBookingInfo] = useState({
    id: null,
    max_guest: 1,
    start_date: "",
    end_date: "",
    total_price: 0,
    user_id: "",
    tour_id: "",
    payment: 0,
    tourInfo: null, 
  });

  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingBooking, setLoadingBooking] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null); 

  useEffect(() => {
    if (openUpdate && bookingIdToUpdate) {
      setLoadingError(null);
      setSubmitError(null);
      setSubmitSuccess(null);

      const fetchData = async () => {
        setLoadingBooking(true);
        try {
          const bookingRes = await axios.get(`http://localhost:8080/booking/${bookingIdToUpdate}`);
          if (bookingRes.data && bookingRes.data.statusCode === 200 && bookingRes.data.data) {
            const data = bookingRes.data.data;
            setBookingInfo({
              id: data.id,
              max_guest: data.max_guest,
              start_date: data.start_date ? data.start_date.split(' ')[0] : "", 
              end_date: data.end_date ? data.end_date.split(' ')[0] : "", 
              total_price: data.total_price,
              user_id: data.user_id.toString(), 
              tour_id: data.tour_id.toString(), 
              payment: data.payment,
              tourInfo: data.tourInfo, 
            });
          } else {
            throw new Error(bookingRes.data?.message || "Booking data not found.");
          }
        } catch (error) {
          console.error("Error fetching booking details:", error);
          setLoadingError(`Failed to load booking details: ${error.message || error.response?.data?.message || "Network error."}`);
        } finally {
          setLoadingBooking(false);
        }

        setLoadingTours(true);
        try {
          const toursRes = await axios.get("http://localhost:8080/tour");
          if (toursRes.data && toursRes.data.statusCode === 200 && Array.isArray(toursRes.data.data)) {
            setTours(toursRes.data.data);
          } else {
            throw new Error("Unexpected tour data format.");
          }
        } catch (error) {
          console.error("Error fetching tours:", error);
          setLoadingError((prev) => prev ? prev + "\n" + "Failed to load tours." : "Failed to load tours.");
          setTours([]);
        } finally {
          setLoadingTours(false);
        }

        setLoadingUsers(true);
        try {
          const usersRes = await axios.get("http://localhost:8080/user");
          if (usersRes.data && usersRes.data.statusCode === 200 && Array.isArray(usersRes.data.data)) {
            setUsers(usersRes.data.data);
          } else {
            throw new Error("Unexpected user data format.");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setLoadingError((prev) => prev ? prev + "\n" + "Failed to load customers." : "Failed to load customers.");
          setUsers([]);
        } finally {
          setLoadingUsers(false);
        }
      };
      fetchData();
    }
  }, [openUpdate, bookingIdToUpdate]);

  useEffect(() => {
    const currentTour = tours.find(t => t.id === parseInt(bookingInfo.tour_id));
    if (currentTour) {
        setBookingInfo(prev => ({
            ...prev,
            total_price: bookingInfo.max_guest * currentTour.price
        }));
    } else if (bookingInfo.tour_id && !currentTour && !loadingTours) {
        
    }
  }, [bookingInfo.max_guest, bookingInfo.tour_id, tours, loadingTours]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSubmitError(null); 
    setSubmitSuccess(null); 

    if (name === "max_guest") {
        setBookingInfo((prev) => ({
            ...prev,
            [name]: parseInt(value),
        }));
    } else if (name === "payment") {
        setBookingInfo((prev) => ({
            ...prev,
            [name]: checked ? 1 : 0,
        }));
    } else {
        setBookingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
  };


  const handleUpdate = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!bookingInfo.tour_id || !bookingInfo.user_id || !bookingInfo.max_guest || !bookingInfo.start_date) {
      setSubmitError("Please fill in all required fields (Tour, Customer, Guests, Start Date).");
      setSubmitting(false);
      return;
    }
    if (bookingInfo.max_guest <= 0) {
      setSubmitError("Number of guests must be at least 1.");
      setSubmitting(false);
      return;
    }
    if (bookingInfo.end_date && new Date(bookingInfo.start_date) > new Date(bookingInfo.end_date)) {
        setSubmitError("End Date cannot be before Start Date.");
        setSubmitting(false);
        return;
    }

    try {
      const formattedStartDate = bookingInfo.start_date ? `${bookingInfo.start_date} 00:00:00` : null;
      const formattedEndDate = bookingInfo.end_date ? `${bookingInfo.end_date} 00:00:00` : null;

      const payload = {
        max_guest: parseInt(bookingInfo.max_guest),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        total_price: parseFloat(bookingInfo.total_price), 
        user_id: parseInt(bookingInfo.user_id),
        tour_id: parseInt(bookingInfo.tour_id),
        payment: bookingInfo.payment,
      };

      const response = await axios.put(
        `http://localhost:8080/booking/${bookingInfo.id}`,
        payload
      );

      if (response.data?.statusCode === 200) {
        setSubmitSuccess("Booking successfully updated! 🎉");
        setSubmitError(null);

        setTimeout(() => {
          setOpenUpdate(false);
          if (typeof refreshBookings === "function") {
            refreshBookings();
          }
        }, 1500);
      } else {
        setSubmitSuccess(null);
        const apiErrorMessage = response.data?.message || "An unknown issue occurred during booking update.";
        setSubmitError(`Operation failed: ${apiErrorMessage}`);
        console.error("API call succeeded but backend indicated an issue:", response.data);
      }
    } catch (error) {
      console.error("Error updating booking:", error.response ? error.response.data : error.message);
      setSubmitSuccess(null);
      if (error.response) {
        setSubmitError(`Server Error: ${error.response.status} - ${error.response.data.message || JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setSubmitError("Network Error: No response from server. Is the backend running?");
      } else {
        setSubmitError(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenUpdate(false);
    setBookingInfo({
      id: null,
      max_guest: 1,
      start_date: "",
      end_date: "",
      total_price: 0,
      user_id: "",
      tour_id: "",
      payment: 0,
      tourInfo: null,
    });
    setLoadingError(null);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const isLoading = loadingBooking || loadingTours || loadingUsers;

  return (
    <div
      className={"modal fade" + (openUpdate ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openUpdate ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Booking</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={handleClose}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            {submitError && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error 🙁</p>
                <p>{submitError}</p>
              </div>
            )}
            {submitSuccess && (
              <div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Success! 🎉</p>
                <p>{submitSuccess}</p>
              </div>
            )}
            {loadingError && (
                <div
                    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
                    role="alert"
                >
                    <p className="font-bold">Warning!</p>
                    <p>{loadingError}</p>
                </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-4"></div>
                Loading booking data...
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium">Tour</label>
                  <select
                    name="tour_id"
                    value={bookingInfo.tour_id || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loadingTours} 
                  >
                    <option value="">Select a Tour</option>
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name} (Price: ${tour.price?.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  {loadingTours && <span className="text-gray-500 text-sm mt-1">Loading tours...</span>}
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Customer</label>
                  <select
                    name="user_id"
                    value={bookingInfo.user_id || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loadingUsers} 
                  >
                    <option value="">Select a Customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fullname || user.username}
                      </option>
                    ))}
                  </select>
                  {loadingUsers && <span className="text-gray-500 text-sm mt-1">Loading customers...</span>}
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Number of Guests</label>
                  <input
                    type="number"
                    placeholder="Enter number of guests"
                    name="max_guest"
                    value={bookingInfo.max_guest}
                    onChange={handleChange}
                    min="1"
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Total Price</label>
                  <input
                    type="number" 
                    placeholder="Enter Total Price"
                    name="total_price"
                    value={bookingInfo.total_price?.toFixed(2) || ""}
                    onChange={handleChange}
                    step="0.01"
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={bookingInfo.start_date || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={bookingInfo.end_date || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-row items-center col-span-2 mt-2">
                  <input
                    type="checkbox"
                    name="payment"
                    checked={bookingInfo.payment === 1}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="font-medium">
                      {bookingInfo.payment === 1 ? "Paid" : "Unpaid"}
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer flex justify-end p-4 border-t border-gray-200">
            <button
              type="button"
              className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
              disabled={submitting}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
              disabled={submitting || isLoading} 
            >
              {submitting ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </span>
              ) : (
                "Update Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;