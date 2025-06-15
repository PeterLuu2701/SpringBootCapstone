"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Link from "next/link";
import UpdateDestination from "@/components/admin-model/Update-Destination";
import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import AddDestination from "@/components/admin-model/Add-Destination";
import DeleteDestination from "@/components/admin-model/Delete-Destination";
import axios from "axios";
const DestinationDashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nameDelete, setNameDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [infoUpdate, setInfoUpdate] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/destination");
      if (res.data && res.data.data && Array.isArray(res.data.data.content)) {
        setDestinations(res.data.data.content);
      } else if (Array.isArray(res.data)) {
        setDestinations(res.data);
      } else {
        console.error("Unexpected response structure:", res.data);
        setDestinations([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshDestinations = () => {
    fetchData();
  };

  if (loading) {
    return <div>Loading destinations...</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Destination Dashboard</h2>
      <Button
        variant="success"
        size="sm"
        onClick={() => {
          setOpenAdd(true);
        }}
      >
        Add Destination <GrFormAdd />
      </Button>
      <br />
      <br />

      <Table striped bordered hover responsive className="shadow">
        <thead className="bg-light">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Country</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.id}</td>
              <td>{destination.name}</td>
              <td>{destination.description}</td>
              <td>
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{destination.country}</td>

              <td className="text-center">
                <Link
                  href={`/admin/destination-details/${destination.id}`}
                  passHref
                >
                  <Button variant="primary" size="sm" className="me-2">
                    <FaEye />
                  </Button>
                </Link>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setOpenUpdate(true);
                    setInfoUpdate(destination);
                  }}
                >
                  <FaPen />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setOpenDelete(true);
                    setNameDelete(destination.name);
                    setIdDelete(destination.id);
                  }}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateDestination
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        setDestinations={refreshDestinations}
        infoUpdate={infoUpdate}
      />
      <AddDestination
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        setDestinations={refreshDestinations}
      />
      <DeleteDestination
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        name={nameDelete}
        id={idDelete}
        setDestinations={refreshDestinations}
      />
    </Container>
  );
};

export default DestinationDashboard;
