"use client";

import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const ContactDashboard = () => {
  // Dữ liệu liên hệ mẫu (thay bằng API thật sau)
  const contacts = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a.nguyen@example.com",
      phone: "0901234567",
      message: "Tôi muốn đặt tour du lịch Sapa.",
      dateReceived: "2023-11-20",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b.tran@example.com",
      phone: "0909876543",
      message: "Xin tư vấn về tour Đà Nẵng - Hội An.",
      dateReceived: "2023-11-25",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "c.le@example.com",
      phone: "0912345678",
      message: "Tôi muốn biết thêm thông tin về tour Nha Trang.",
      dateReceived: "2023-12-01",
    },
     {
      id: 4,
      name: "Phạm Thị D",
      email: "d.pham@example.com",
      phone: "0987654321",
      message: "Xin báo giá tour Phú Quốc.",
      dateReceived: "2023-12-05",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "e.hoang@example.com",
      phone: "0934567890",
      message: "Tôi cần hỗ trợ đặt vé máy bay.",
      dateReceived: "2023-12-10",
    },
    {
      id: 6,
      name: "Đỗ Thị F",
      email: "f.do@example.com",
      phone: "0967890123",
      message: "Xin tư vấn về các chương trình khuyến mãi.",
      dateReceived: "2023-12-15",
    },
    {
      id: 7,
      name: "Vũ Văn G",
      email: "g.vu@example.com",
      phone: "0978901234",
      message: "Tôi muốn góp ý về chất lượng dịch vụ.",
      dateReceived: "2023-12-20",
    },
    {
      id: 8,
      name: "Phan Thị H",
      email: "h.phan@example.com",
      phone: "0945678901",
      message: "Tôi muốn phản hồi về một trải nghiệm không tốt.",
      dateReceived: "2023-12-25",
    },
     {
      id: 9,
      name: "Bùi Văn I",
      email: "i.bui@example.com",
      phone: "0956789012",
      message: "Tôi muốn tìm hiểu về chính sách hoàn hủy.",
      dateReceived: "2023-12-30",
    },
    {
      id: 10,
      name: "Ngô Thị K",
      email: "k.ngo@example.com",
      phone: "0923456789",
      message: "Tôi có một câu hỏi chung về dịch vụ.",
      dateReceived: "2024-01-05",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Contact Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date Received</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>{contact.dateReceived}</td>
              <td className="text-center">
                <Button variant="primary" size="sm" className="me-2">
                  View
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

export default ContactDashboard;