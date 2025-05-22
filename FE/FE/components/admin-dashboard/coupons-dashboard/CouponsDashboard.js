// components/coupons-dashboard/CouponsDashboard.js
"use client";

import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const CouponsDashboard = () => {
  // Dữ liệu mã giảm giá mẫu (thay bằng API thật sau)
  const coupons = [
    {
      id: 1,
      code: "GIAM10",
      discountPercentage: 10,
      startDate: "2023-11-20",
      endDate: "2023-12-20",
      status: "Active", // Active, Inactive
      usageCount: 50,
    },
    {
      id: 2,
      code: "XMAS20",
      discountPercentage: 20,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      status: "Inactive",
      usageCount: 0,
    },
    {
      id: 3,
      code: "NEWYEAR5",
      discountPercentage: 5,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "Active",
      usageCount: 100,
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Coupons Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Code</th>
            <th>Discount (%)</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Usage Count</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.id}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discountPercentage}</td>
              <td>{coupon.startDate}</td>
              <td>{coupon.endDate}</td>
              <td>{coupon.status}</td>
              <td>{coupon.usageCount}</td>
              <td className="text-center">
                <Button variant="primary" size="sm" className="me-1">
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

export default CouponsDashboard;