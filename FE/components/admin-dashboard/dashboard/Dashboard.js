// components/dashboard/Dashboard.js
"use client";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  // Dữ liệu thống kê mẫu (thay bằng API thật sau)
  const stats = {
    totalUsers: 150,
    totalTours: 30,
    totalBookings: 200,
    totalReviews: 100,
    pendingReviews: 10,
    totalContacts: 50,
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4 text-center">{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Total Tours</Card.Title>
              <Card.Text className="display-4 text-center">{stats.totalTours}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text className="display-4 text-center">{stats.totalBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Total Reviews</Card.Title>
              <Card.Text className="display-4 text-center">{stats.totalReviews}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Pending Reviews</Card.Title>
              <Card.Text className="display-4 text-center">{stats.pendingReviews}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
       <Row className="mt-4">
          <Col md={12}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Total Contacts</Card.Title>
                <Card.Text className="display-4 text-center">{stats.totalContacts}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default Dashboard;