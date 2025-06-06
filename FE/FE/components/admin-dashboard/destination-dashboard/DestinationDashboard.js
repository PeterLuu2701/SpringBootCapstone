"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import UpdateDestination from "@/components/admin-model/Update-Destination";
import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import AddDestination from "@/components/admin-model/Add-Destination";
import DeleteDestination from "@/components/admin-model/Delete-Destination";
import axios from "axios";
import ReactPaginate from "react-paginate";

const DestinationDashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nameDelete, setNameDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [infoUpdate, setInfoUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/destination`);
      const data = res.data?.data || [];
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response: data is not an array");
      }
      setDestinations(data);
      setPageCount(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load destinations. Please try again.");
      setDestinations([]);
      setPageCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_URL, openUpdate]);

  // Calculate the current page's destinations for client-side pagination
  const startIndex = currentPage * itemsPerPage;
  const currentDestinations = Array.isArray(destinations)
    ? destinations.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Destination Dashboard</h2>
      <Button
        variant="success"
        size="sm"
        onClick={() => setOpenAdd(true)}
        aria-label="Add new destination"
      >
        Add Destination <GrFormAdd />
      </Button>
      <br />
      <br />

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading destinations...</p>
        </div>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="shadow"
            aria-label="Destinations table"
          >
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
              {currentDestinations.length > 0 ? (
                currentDestinations.map((destination) => (
                  <tr key={destination.id}>
                    <td>{destination.id}</td>
                    <td>{destination.name}</td>
                    <td>{destination.description}</td>
                    <td>
                      <div className="imageAdmin">
                        <img
                          src={destination.image || "/default-image.jpg"}
                          alt={destination.name || "Destination image"}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    </td>
                    <td>{destination.country}</td>
                    <td className="text-center">
                      <Link
                        href={`/admin/destination-details/${destination.id}`}
                        passHref
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          aria-label={`View details for ${destination.name}`}
                        >
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
                        aria-label={`Edit ${destination.name}`}
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
                        aria-label={`Delete ${destination.name}`}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No destinations available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {pageCount > 0 && (
            <div className="row justify-content-center mt-4 mb-4">
              <ReactPaginate
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination flex justify-center space-x-2 mt-10"
                activeClassName="bg-blue-600 text-white"
                disabledClassName="disabled"
                ariaLabelBuilder={(page) => `Page ${page}`}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </>
      )}

      <UpdateDestination
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        setDestinations={setDestinations}
        infoUpdate={infoUpdate}
      />
      <AddDestination
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        setDestinations={setDestinations}
      />
      <DeleteDestination
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        name={nameDelete}
        id={idDelete}
        setDestinations={setDestinations}
      />
    </Container>
  );
};

export default DestinationDashboard;
