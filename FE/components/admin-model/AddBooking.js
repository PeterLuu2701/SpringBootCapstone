"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const AddBooking = ({ openAddBooking, setOpenAddBooking, refreshBookings }) => {
  const [bookingInfo, setBookingInfo] = useState({
    tourId: "",
    userId: "",
    maxGuest: 1,
    startDate: "",
    endDate: "",
    totalPrice: 0,
    payment: 0,
  });

  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTourPrice, setSelectedTourPrice] = useState(0);

  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (openAddBooking) {
      const fetchTours = async () => {
        setLoadingTours(true);
        setLoadingError(null);
        try {
          const res = await axios.get("http://localhost:8080/tour");
          if (
            res.data &&
            res.data.statusCode === 200 &&
            Array.isArray(res.data.data)
          ) {
            setTours(res.data.data);
          } else {
            console.error("Unexpected response structure for tours:", res.data);
            setTours([]);
            setLoadingError("Failed to load tours: Unexpected data format.");
          }
        } catch (error) {
          console.error("Error fetching tours:", error);
          setLoadingError("Failed to load tours. Please check the server.");
          setTours([]);
        } finally {
          setLoadingTours(false);
        }
      };
      fetchTours();
    }
  }, [openAddBooking]);

  useEffect(() => {
    if (openAddBooking) {
      const fetchUsers = async () => {
        setLoadingError(null);
        try {
          const res = await axios.get("http://localhost:8080/user");
          if (
            res.data &&
            res.data.statusCode === 200 &&
            Array.isArray(res.data.data)
          ) {
            setUsers(res.data.data);
          } else {
            console.error("Unexpected response structure for users:", res.data);
            setUsers([]);
            setLoadingError("Failed to load users: Unexpected data format.");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setLoadingError("Failed to load users. Please check the server.");
          setUsers([]);
        } finally {
          setLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [openAddBooking]);

  useEffect(() => {
    const calculatedPrice = bookingInfo.maxGuest * selectedTourPrice;
    setBookingInfo((prev) => ({
      ...prev,
      totalPrice: calculatedPrice,
    }));
  }, [bookingInfo.maxGuest, selectedTourPrice]);

  useEffect(() => {
    if (openAddBooking) {
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [openAddBooking]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleTourChange = (e) => {
    const selectedId = e.target.value;
    const tour = tours.find((t) => t.id === parseInt(selectedId));
    setBookingInfo((prev) => ({
      ...prev,
      tourId: selectedId,
      maxGuest: 1,
      totalPrice: tour ? tour.price * 1 : 0,
    }));
    setSelectedTourPrice(tour ? tour.price : 0);
  };

  const handleUserChange = (e) => {
    setBookingInfo((prev) => ({
      ...prev,
      userId: e.target.value,
    }));
  };

  const handleAddBooking = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    if (
      !bookingInfo.tourId ||
      !bookingInfo.userId ||
      !bookingInfo.maxGuest ||
      !bookingInfo.startDate
    ) {
      setSubmitError(
        "Please fill in all required fields (Tour, Customer, Guests, Start Date)."
      );
      setSubmitting(false);
      return;
    }
    if (bookingInfo.maxGuest <= 0) {
      setSubmitError("Number of guests must be at least 1.");
      setSubmitting(false);
      return;
    }
    if (
      bookingInfo.endDate &&
      new Date(bookingInfo.startDate) > new Date(bookingInfo.endDate)
    ) {
      setSubmitError("End Date cannot be before Start Date.");
      setSubmitting(false);
      return;
    }

    try {
      const formattedStartDate = bookingInfo.startDate
        ? `${bookingInfo.startDate} 00:00:00`
        : null;
      const formattedEndDate = bookingInfo.endDate
        ? `${bookingInfo.endDate} 00:00:00`
        : null;

      const payload = {
        tour_id: parseInt(bookingInfo.tourId),
        user_id: parseInt(bookingInfo.userId),
        max_guest: parseInt(bookingInfo.maxGuest),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        total_price: bookingInfo.totalPrice,
        payment: bookingInfo.payment,
      };

      const response = await axios.post(
        "http://localhost:8080/booking",
        payload
      );

      if (response.data?.statusCode === 200) {
        setSubmitSuccess(true);

        setTimeout(() => {
          setOpenAddBooking(false); 
          if (typeof refreshBookings === "function") {
            refreshBookings();
          }

          setBookingInfo({
            tourId: "",
            userId: "",
            maxGuest: 1,
            startDate: "",
            endDate: "",
            totalPrice: 0,
            payment: 0,
          });
          setSelectedTourPrice(0);
          setSubmitSuccess(false); 
        }, 1500); 
      }
    } catch (error) {
      console.error(
        "Error adding booking:",
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        setSubmitError(
          `Server Error: ${error.response.status} - ${
            error.response.data.message || JSON.stringify(error.response.data)
          }`
        );
      } else if (error.request) {
        setSubmitError(
          "Network Error: No response from server. Is the backend running?"
        );
      } else {
        setSubmitError(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenAddBooking(false);
    setBookingInfo({
      tourId: "",
      userId: "",
      maxGuest: 1,
      startDate: "",
      endDate: "",
      totalPrice: 0,
      payment: 0,
    });
    setSelectedTourPrice(0);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return (
    <div
      className={"modal fade" + (openAddBooking ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openAddBooking ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        overflowY: "auto", 
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Booking</h5>
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
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {submitError}</span>
              </div>
            )}
            {submitSuccess && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Booking added successfully! 🎉
                </span>
              </div>
            )}
            {loadingError && (
              <div
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Warning!</strong>
                <span className="block sm:inline"> {loadingError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Tour</label>
                {loadingTours ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                    Loading Tours...
                  </div>
                ) : (
                  <select
                    name="tourId"
                    value={bookingInfo.tourId}
                    onChange={handleTourChange}
                    className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    <option value="">Select a Tour</option>
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name} (Price: ${tour.price?.toFixed(2)})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Customer</label>
                {loadingUsers ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                    Loading Customers...
                  </div>
                ) : (
                  <select
                    name="userId"
                    value={bookingInfo.userId}
                    onChange={handleUserChange}
                    className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    <option value="">Select a Customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fullname || user.username}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Number of Guests</label>
                <input
                  type="number"
                  placeholder="Enter number of guests"
                  name="maxGuest"
                  value={bookingInfo.maxGuest}
                  onChange={handleChange}
                  min="1"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingInfo.startDate}
                  onChange={handleChange}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={bookingInfo.endDate}
                  onChange={handleChange}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Total Price</label>
                <input
                  type="text"
                  value={`$${bookingInfo.totalPrice.toFixed(2)}`}
                  readOnly
                  className="border rounded p-1 bg-gray-100 focus:outline-none" 
                />
              </div>

              <div className="flex flex-col col-span-2">
                {" "}
                <label className="font-medium">Payment Status</label>
                <input
                  type="checkbox"
                  name="payment"
                  checked={bookingInfo.payment === 1}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>{bookingInfo.payment === 1 ? "Paid" : "Unpaid"}</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddBooking}
              disabled={submitting}
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                "Create Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
