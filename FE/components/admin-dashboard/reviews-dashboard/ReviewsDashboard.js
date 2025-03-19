// components/reviews-dashboard/ReviewsDashboard.js
"use client";

import React from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";

const ReviewsDashboard = () => {
  // Dữ liệu đánh giá mẫu (thay bằng API thật sau)
  const reviews = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      tourName: "Tour Hà Nội - Sapa 3N2Đ",
      rating: 5,
      comment: "Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, cảnh đẹp.",
      date: "2023-11-20",
      status: "Published", // Published, Pending, Rejected
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      tourName: "Tour Đà Nẵng - Hội An 4N3Đ",
      rating: 4,
      comment: "Khách sạn tốt, nhưng bữa ăn chưa đa dạng.",
      date: "2023-11-25",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      tourName: "Tour Nha Trang 5N4Đ",
      rating: 3,
      comment: "Biển đẹp, nhưng thời tiết hơi nóng.",
      date: "2023-12-01",
      status: "Published",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Reviews Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.customerName}</td>
              <td>{review.tourName}</td>
              <td>{review.rating} <i className="fas fa-star text-warning"></i></td>
              <td>{review.comment}</td>
              <td>{review.date}</td>
              <td>
                {review.status === "Published" && (
                  <Badge bg="success">Published</Badge>
                )}
                {review.status === "Pending" && (
                  <Badge bg="warning" text="dark">Pending</Badge>
                )}
                {review.status === "Rejected" && (
                  <Badge bg="danger">Rejected</Badge>
                )}
              </td>
              <td className="text-center">
                {review.status === "Pending" && (
                  <>
                    <Button variant="success" size="sm" className="me-1">
                      Approve
                    </Button>
                    <Button variant="danger" size="sm">
                      Reject
                    </Button>
                  </>
                )}
                {review.status !== "Pending" && (
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReviewsDashboard;