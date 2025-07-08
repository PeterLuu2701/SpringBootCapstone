"use client";

import { useState, useEffect } from "react"; 
import Link from "next/link";

const TourBookingForm = ({ tourId, price, duration }) => {
  const [maxGuest, setMaxGuest] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(price || 0); 
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  const backendBaseUrl = "http://localhost:8080";

  useEffect(() => {
    if (price !== undefined && maxGuest > 0) {
      setTotalPrice(price * maxGuest);
    }
  }, [maxGuest, price]);

  const handleMaxGuestChange = (e) => {
    const value = e.target.value;
    // Allow empty string to clear the input, or valid integer
    if (value === "" || /^[0-9]+$/.test(value)) {
      setMaxGuest(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    setBookingMessage("");
    setBookingError("");

    if (!tourId) {
      setBookingError("Tour ID is missing.");
      return;
    }
    if (maxGuest === "" || parseInt(maxGuest, 10) < 1) {
      setBookingError("Please enter a valid number of guests (at least 1).");
      return;
    }
    if (!startDate) {
      setBookingError("Please select a start date.");
      return;
    }
    if (!endDate) {
      setBookingError("Please select an end date.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setBookingError("End date cannot be before start date.");
      return;
    }

    try {
      const bookingData = {
        max_guest: parseInt(maxGuest, 10),
        start_date: `${startDate} 10:00:00`, 
        end_date: `${endDate} 18:00:00`, 
        tour_id: tourId,
      };

      console.log("Sending booking data:", bookingData); 

      const response = await fetch(`${backendBaseUrl}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log("Booking API response:", data); 

      if (response.ok && !data.error) {
        setBookingMessage("Booking successful! Your booking ID is: " + data.data.id);
        setMaxGuest(1);
        setStartDate("");
        setEndDate("");
      } else {
        setBookingError(data.message || "Failed to create booking. Please try again.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setBookingError("An unexpected error occurred. Please try again later.");
    }
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  return (
    <div
      className="widget widget-booking"
      data-aos="fade-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <h5 className="widget-title">Tour Booking</h5>
      <form onSubmit={handleBookNow}>
        <div className="date mb-25">
          <b>From Date</b>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={minDate} 
            required
          />
        </div>
        <div className="date mb-25">
          <b>To Date</b>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || minDate} 
            required
          />
        </div>
        <hr />
        <h6>Guests:</h6>
        <div className="mb-25">
          <input
            type="number"
            min="1"
            value={maxGuest}
            onChange={handleMaxGuestChange}
            placeholder="Number of Guests"
            required
            className="form-control" 
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <hr className="mb-25" />
        <h6>
          Total: <span className="price">${totalPrice.toFixed(2)}</span>{" "}
        </h6>
        {bookingMessage && (
          <div className="alert alert-success mt-3">{bookingMessage}</div>
        )}
        {bookingError && (
          <div className="alert alert-danger mt-3">{bookingError}</div>
        )}
        <button type="submit" className="theme-btn style-two w-100 mt-15 mb-5">
          <span data-hover="Book Now">Book Now</span>
          <i className="fal fa-arrow-right" />
        </button>
        <div className="text-center">
          <Link href="/contact">Need some help?</Link>
        </div>
      </form>
    </div>
  );
};

export default TourBookingForm;