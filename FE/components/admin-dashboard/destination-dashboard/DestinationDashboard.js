"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button, Pagination } from "react-bootstrap"; // Import Pagination
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0); // Backend pages are 0-indexed
  const [pageSize, setPageSize] = useState(10); // Matches backend default
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0); // To display total items

  const fetchData = async () => {
    setLoading(true);
    try {
      // Pass page and size as query parameters
      const res = await axios.get(
        `http://localhost:8080/destination?page=${currentPage}&size=${pageSize}`
      );
      if (res.data && res.data.data) {
        const { content, totalPages, totalElements } = res.data.data;
        if (Array.isArray(content)) {
          setDestinations(content);
          setTotalPages(totalPages);
          setTotalElements(totalElements);
        } else {
          console.error("Unexpected content structure:", res.data.data);
          setDestinations([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      } else if (Array.isArray(res.data)) {
        // Fallback for unexpected response structure (if it returns just an array without pagination info)
        setDestinations(res.data);
        setTotalPages(1); // Assume one page if no pagination info
        setTotalElements(res.data.length);
      } else {
        console.error("Unexpected response structure:", res.data);
        setDestinations([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDestinations([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Re-fetch data when currentPage or pageSize changes

  const refreshDestinations = () => {
    // When refreshing, reset to first page or keep current page, depending on desired behavior
    // For simplicity, let's re-fetch the current page.
    fetchData();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading destinations...</div>;
  }

  // Generate pagination items
  let items = [];
  for (let number = 0; number < totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number + 1}
      </Pagination.Item>
    );
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

      {totalElements === 0 ? (
        <p className="text-center">No destinations found.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow">
            <thead className="bg-light">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Country</th>
                <th>City</th>
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
                  <td>{destination.countryName || "N/A"}</td>
                  <td>{destination.cityName || "N/A"}</td>

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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                />
                {items}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                />
              </Pagination>
            </div>
          )}
          <div className="text-center mt-2">
            <small>
              Showing {destinations.length} of {totalElements} destinations.
            </small>
          </div>
        </>
      )}

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