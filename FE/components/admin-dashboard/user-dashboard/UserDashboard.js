"use client";

import CreateUser from "@/components/admin-model/CreateUser";
import DeleteUser from "@/components/admin-model/DeleteUser";
import UpdateUser from "@/components/admin-model/UpdateUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [usernameToDelete, setUsernameToDelete] = useState("");
  const [infoUpdate, setInfoUpdate] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user");
      console.log("API response:", res.data);
      if (res.data && Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        console.error("Unexpected response structure:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshUsers = () => {
    fetchData();
  };

  const handleUpdateClick = (user) => {
    setInfoUpdate(user);
    setOpenUpdate(true);
  };

  const handleCreateClick = () => {
    setOpenAdd(true);
  };

  const handleDeleteClick = (userId, username) => {
    setUserIdToDelete(userId);
    setUsernameToDelete(username);
    setOpenDelete(true);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Users Dashboard</h2>
      <Button variant="primary" className="mb-3" onClick={handleCreateClick}>
        Create User
      </Button>

      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
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
              <td className="text-center">
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdateClick(user)}
                >
                  Update
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(user.id, user.username)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {openUpdate && (
        <UpdateUser
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          setUsers={refreshUsers}
          infoUpdate={infoUpdate}
        />
      )}

      {openAdd && (
        <CreateUser
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          setUsers={refreshUsers}
        />
      )}

      {openDelete && (
        <DeleteUser
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          userIdToDelete={userIdToDelete}
          usernameToDelete={usernameToDelete}
          setUsers={refreshUsers}
        />
      )}
    </Container>
  );
};

export default UsersDashboard;
