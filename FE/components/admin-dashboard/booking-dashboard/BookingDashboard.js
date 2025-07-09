"use client";

import React, { useState, useEffect } from "react";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import AddBooking from "@/components/admin-model/AddBooking";
import axios from "axios";
import UpdateBooking from "@/components/admin-model/UpdateBooking";
import DeleteBooking from "@/components/admin-model/DeleteBooking"; 

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingIdToUpdate, setBookingIdToUpdate] = useState(null);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null); 
  const [openAddBooking, setOpenAddBooking] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false); 

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/booking");
      if (
        response.data &&
        response.data.statusCode === 200 &&
        Array.isArray(response.data.data)
      ) {
        setBookings(response.data.data);
      } else {
        console.error(
          "Unexpected response structure for bookings:",
          response.data
        );
        setBookings([]);
        setError("Failed to load bookings: Unexpected data format.");
      }
    } catch (e) {
      console.error("Error fetching bookings:", e);
      setError(
        e.response?.data?.message ||
          "Failed to load bookings. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const refreshBookings = () => {
    fetchBookings();
  };

  const handleAddBookingClick = () => {
    setOpenAddBooking(true);
  };

  const handleDeleteBookingClick = (id) => {
    setBookingIdToDelete(id); 
    setOpenDelete(true); 
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading bookings... ⏳</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
        <Button variant="info" onClick={refreshBookings} className="mt-3">
          Retry Loading Bookings
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Booking Dashboard</h2>

      <Button
        variant="success"
        size="sm"
        onClick={handleAddBookingClick}
        className="mb-3"
      >
        Add New Booking <GrFormAdd />
      </Button>

      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Booking ID</th>
            <th>Booking Date</th>
            <th>Guest</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Tour Name</th>
            <th>Destination</th>
            <th>Country</th>
            <th>City</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment</th>
            <th>User ID</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.id}</td>
                <td>
                  {booking.booking_date
                    ? new Date(booking.booking_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{booking.max_guest}</td>
                <td>
                  {booking.tourInfo?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>
                  {booking.total_price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{booking.tourInfo?.name || "N/A"}</td>
                <td>{booking.tourInfo?.destinationName || "N/A"}</td>
                <td>{booking.tourInfo?.destinationCountryName || "N/A"}</td>
                <td>{booking.tourInfo?.destinationCityName || "N/A"}</td>
                <td>
                  {booking.start_date
                    ? new Date(booking.start_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {booking.end_date
                    ? new Date(booking.end_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {booking.payment === 1 ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td>{booking.user_id}</td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setBookingIdToUpdate(booking.id);
                      setOpenUpdate(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteBookingClick(booking.id)} 
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15" className="text-center">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {openAddBooking && (
        <AddBooking
          openAddBooking={openAddBooking}
          setOpenAddBooking={setOpenAddBooking}
          refreshBookings={refreshBookings}
        />
      )}

      {openUpdate && (
        <UpdateBooking
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          bookingIdToUpdate={bookingIdToUpdate}
          refreshBookings={refreshBookings}
        />
      )}

      {openDelete && (
        <DeleteBooking
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          bookingIdToDelete={bookingIdToDelete} 
          refreshBookings={refreshBookings} 
        />
      )}
    </Container>
  );
};

export default BookingDashboard;