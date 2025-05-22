"use client";

import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const AddUser = ({ show, onHide, setUsers }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    roleName: "",
    password: "", // Added password field
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const newUser = response.data.data; // Assuming API returns the created user
      setUsers((prev) => [...prev, newUser]);
      setFormData({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        roleName: "",
        password: "",
      });
      onHide();
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
      setError(
        "Failed to add user: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg"
      >
        <Modal.Title className="font-semibold"> + Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-50 p-6 rounded-b-lg">
        {error && (
          <div className="text-center text-red-500 bg-red-100 border border-red-400 rounded p-2 mb-4">
            {error}
          </div>
        )}
        <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Username"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Full Name"
              />
            </Form.Group>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Phone
              </Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Phone"
              />
            </Form.Group>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Role
              </Form.Label>
              <Form.Select
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Role"
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                aria-label="Password"
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-gray-100 border-t border-gray-200">
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={loading}
          className="rounded-lg shadow-sm hover:bg-gray-400 transition-colors"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          aria-label="Add User"
        >
          {loading ? "Adding..." : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
