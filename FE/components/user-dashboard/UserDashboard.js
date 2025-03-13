"use client";

import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";

const UsersDashboard = () => {
  const users = [
    {
      id: 1,
      username: "JohnDoe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      id: 2,
      username: "JaneSmith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      username: "AliceJohnson",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine Ln",
    },
    {
      id: 4,
      username: "RobertBrown",
      email: "robert.brown@example.com",
      phone: "111-222-3333",
      address: "101 Elm Rd",
    },
    {
      id: 5,
      username: "EmilyDavis",
      email: "emily.davis@example.com",
      phone: "444-555-6666",
      address: "222 Cedar Way",
    },
    {
      id: 6,
      username: "MichaelWilson",
      email: "michael.wilson@example.com",
      phone: "777-888-9999",
      address: "333 Birch Pl",
    },
    {
      id: 7,
      username: "SarahGarcia",
      email: "sarah.garcia@example.com",
      phone: "100-200-3000",
      address: "444 Maple Dr",
    },
    {
      id: 8,
      username: "DavidRodriguez",
      email: "david.rodriguez@example.com",
      phone: "600-700-8000",
      address: "555 Walnut Ct",
    },
    {
      id: 9,
      username: "JenniferMartinez",
      email: "jennifer.martinez@example.com",
      phone: "900-100-2000",
      address: "666 Cherry Ln",
    },
    {
      id: 10,
      username: "ChristopherAnderson",
      email: "christopher.anderson@example.com",
      phone: "300-400-5000",
      address: "777 Willow Ave",
    },
  ];

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
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

export default UsersDashboard;
