// components/payments-dashboard/PaymentsDashboard.js
"use client";

import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const PaymentsDashboard = () => {
  // Dữ liệu thanh toán mẫu (thay bằng API thật sau)
  const payments = [
    {
      id: 1,
      transactionId: "TXN12345",
      customerName: "Nguyễn Văn A",
      amount: 5000000, // VND
      paymentDate: "2023-11-20",
      status: "Completed",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      transactionId: "TXN67890",
      customerName: "Trần Thị B",
      amount: 7500000,
      paymentDate: "2023-11-25",
      status: "Pending",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      transactionId: "TXN11223",
      customerName: "Lê Văn C",
      amount: 6000000,
      paymentDate: "2023-12-01",
      status: "Completed",
      paymentMethod: "Bank Transfer",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Payments Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.customerName}</td>
              <td>{payment.amount.toLocaleString('vi-VN')} VND</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.status}</td>
              <td>{payment.paymentMethod}</td>
              <td className="text-center">
                <Button variant="info" size="sm" className="me-2">
                  View Details
                </Button>
                <Button variant="danger" size="sm">
                  Refund
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentsDashboard;