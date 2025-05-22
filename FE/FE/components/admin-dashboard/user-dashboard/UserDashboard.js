"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AddUser from "@/components/admin-model/Add-User";
import UpdateUser from "@/components/admin-model/Update-User";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users from:", `${API_URL}/users`);
      const response = await axios.get(`${API_URL}/users`);
      console.log("GET response:", response.data);
      const data = response.data.data || [];
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response: data is not an array");
      }
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("GET error:", error.response?.data || error.message);
      setError(
        "Failed to fetch users: " +
          (error.response?.data?.message || error.message)
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    console.log("Editing user:", user);
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      console.log("Sending DELETE request to:", `${API_URL}/users/${id}`);
      await axios.delete(`${API_URL}/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("DELETE error:", error.response?.data || error.message);
      setError(
        "Failed to delete user: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Users Dashboard</h2>

      <br />
      <br />
      {error && <div className="text-center text-danger mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center">No users available</div>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="shadow"
          aria-label="Users table"
        >
          <thead className="bg-light">
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.roleName || "N/A"}</td>
                <td className="text-center">
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                    aria-label={`Edit ${user.username}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    aria-label={`Delete ${user.username}`}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <UpdateUser
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        user={selectedUser}
        setUsers={setUsers}
      />
    </Container>
  );
};

export default UsersDashboard;
