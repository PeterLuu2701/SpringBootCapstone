// components/your-information/YourInformation.js
"use client";

import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const YourInformation = () => {
  // Dữ liệu người dùng mẫu (thay bằng API hoặc state quản lý sau)
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    lastLogin: "2023-11-21 10:00 AM",
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Your Information</h2>
      <Card className="shadow">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Name:</strong> {user.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {user.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Role:</strong> {user.role}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Login:</strong> {user.lastLogin}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default YourInformation;