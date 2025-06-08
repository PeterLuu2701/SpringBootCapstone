"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const UsersDashboard = () => {
  const [users, setUser] = useState([]);
  // const [openUpdate, setOpenUpdate] = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  // const [nameDelete, setNameDelete] = useState("");
  // const [idDelete, setIdDelete] = useState("");
  // const [infoUpdate, setInfoUpdate] = useState({});
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/user");
    console.log("API response:", res.data);
    if (res.data && Array.isArray(res.data.data)) {
      setUser(res.data.data);  
    } else {
      console.error("Unexpected response structure:", res.data);
      setUser([]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setUser([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const refreshUser = () => {
    fetchData(); 
  };

  if (loading) {
    return <div>Loading users...</div>;
  }


  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Users Dashboard</h2>
      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            {/* <th>Address</th> */}
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
              {/* <td>{user.address}</td> */}
              <td className="text-center">
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