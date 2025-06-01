"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import { Alert } from 'react-bootstrap'; 


const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null); 
  const [apiMessage, setApiMessage] = useState(null); 
  const [messageVariant, setMessageVariant] = useState("success");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/booking");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.error) {
          throw new Error(result.message);
        }
        setBookings(result.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); 

  const handleEdit = (booking) => {
    setCurrentBooking({
      ...booking,
      paymentStatus: booking.payment === 0 ? "Pending" : "Confirmed",
      total_price: parseFloat(booking.total_price),
      max_guest: parseInt(booking.max_guest),
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentBooking(null); 
    setApiMessage(null); 
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCurrentBooking((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value, 
    }));
  };

  const handleSave = async () => {
    if (!currentBooking) return;

    setLoading(true); 
    setError(null); 
    setApiMessage(null); 

    const bookingId = currentBooking.id;
    const updatePayload = {
      max_guest: parseInt(currentBooking.max_guest),
      total_price: parseFloat(currentBooking.total_price),
      payment: currentBooking.paymentStatus === "Pending" ? 0 : 1,
    };

    try {
      const response = await fetch(`http://localhost:8080/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      const result = await response.json(); 

      if (!response.ok) {
        throw new Error(result.message || `Failed to update booking (Status: ${response.status})`);
      }

      if (result.error) {
        throw new Error(result.message);
      }

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking, 
                max_guest: updatePayload.max_guest,
                total_price: updatePayload.total_price,
                payment: updatePayload.payment,
              }
            : booking
        )
      );
      setApiMessage(result.message || "Booking updated successfully!");
      setMessageVariant("success");
      handleCloseEditModal(); 
    } catch (e) {
      setError(e.message);
      setMessageVariant("danger");
    } finally {
      setLoading(false); 
    }
  };


  if (loading && !currentBooking) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading bookings...</span>
        </Spinner>
        <p>Loading bookings...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }


  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Booking Dashboard</h2>

      {apiMessage && ( // Display API success/error messages
        <Alert variant={messageVariant} className="mb-3">
          {apiMessage}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Alert variant="info" className="text-center">
          No bookings found.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow">
          <thead className="bg-light">
            <tr>
              <th>No.</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Tour Name</th>
              <th>Tour Price</th>
              <th>Tour Duration</th>
              <th>Booking Date</th>
              <th>Max Guests</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userName}</td> 
                <td>{booking.userEmail}</td> 
                <td>{booking.userPhone}</td> 
                <td>{booking.tourName}</td> 
                <td>{booking.tourPrice}</td> 
                <td>{booking.tourDuration}</td> 
                <td>{new Date(booking.booking_date).toLocaleDateString('en-CA')}</td> 
                <td>{booking.max_guest}</td> 
                <td>{booking.total_price}</td> 
                <td>{booking.payment === 0 ? "Pending" : "Confirmed"}</td> 
                <td className="text-center">
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(booking)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking (ID: {currentBooking?.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBooking && (
            <Form>
              <Form.Group className="mb-3" controlId="formMaxGuest">
                <Form.Label>Max Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="max_guest" 
                  value={currentBooking.max_guest} 
                  onChange={handleChange}
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTotalPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="number"
                  name="total_price" 
                  value={currentBooking.total_price} 
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPaymentStatus">
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  name="paymentStatus" 
                  value={currentBooking.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingDashboard;