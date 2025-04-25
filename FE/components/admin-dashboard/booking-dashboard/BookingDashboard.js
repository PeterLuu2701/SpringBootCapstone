"use client";

import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const BookingDashboard = () => {
  // Dữ liệu booking mẫu (thay bằng API thật sau)
  const bookings = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      tourName: "Tour Hà Nội - Sapa",
      bookingDate: "2023-11-20",
      totalPrice: 5000000, // VND
      status: "Confirmed",
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      tourName: "Tour Đà Nẵng - Hội An",
      bookingDate: "2023-11-25",
      totalPrice: 7500000,
      status: "Pending",
    },
    {
       id: 3,
      customerName: "Lê Văn C",
      tourName: "Tour Nha Trang",
      bookingDate: "2023-12-01",
      totalPrice: 6000000,
      status: "Confirmed",
    },
    {
      id: 4,
      customerName: "Phạm Thị D",
      tourName: "Tour Phú Quốc",
      bookingDate: "2023-12-05",
      totalPrice: 8000000,
      status: "Cancelled",
    },
    {
      id: 5,
      customerName: "Hoàng Văn E",
      tourName: "Tour Cần Thơ - Miền Tây",
      bookingDate: "2023-12-10",
      totalPrice: 4500000,
      status: "Confirmed",
    },
     {
      id: 6,
      customerName: "Đỗ Thị F",
      tourName: "Tour Sài Gòn",
      bookingDate: "2023-12-15",
      totalPrice: 3500000,
      status: "Pending",
    },
    {
      id: 7,
      customerName: "Vũ Văn G",
      tourName: "Tour Hạ Long",
      bookingDate: "2023-12-20",
      totalPrice: 9000000,
      status: "Confirmed",
    },
    {
      id: 8,
      customerName: "Phan Thị H",
      tourName: "Tour Huế",
      bookingDate: "2023-12-25",
      totalPrice: 5500000,
      status: "Pending",
    },
    {
      id: 9,
      customerName: "Bùi Văn I",
      tourName: "Tour Đà Lạt",
      bookingDate: "2023-12-30",
      totalPrice: 7000000,
      status: "Confirmed",
    },
    {
      id: 10,
      customerName: "Ngô Thị K",
      tourName: "Tour Vũng Tàu",
      bookingDate: "2024-01-05",
      totalPrice: 4000000,
      status: "Pending",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Booking Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Booking Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customerName}</td>
              <td>{booking.tourName}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.totalPrice.toLocaleString('vi-VN')} VND</td>
              <td>{booking.status}</td>
              <td className="text-center">
                <Button variant="primary" size="sm" className="me-2">
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
    </Container>
  );
};

export default BookingDashboard;