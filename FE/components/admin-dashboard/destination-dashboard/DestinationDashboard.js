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

  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/destination", {
        params: { page: currentPage, size: itemsPerPage },
      });
      console.log("API Response:", res.data); // In log để kiểm tra cấu trúc phản hồi
      // Kiểm tra xem res.data và res.data.data có tồn tại không
      const data = res.data?.data || {};
      const content = Array.isArray(data.content) ? data.content : [];
      const totalPages = data.totalPages || 0;

      setDestinations(content); // Đảm bảo content là một mảng
      setPageCount(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDestinations([]); // Đặt về mảng rỗng nếu có lỗi
      setPageCount(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const refreshDestinations = () => {
    fetchData();
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
          {Array.isArray(destinations) && destinations.length > 0 ? (
            destinations.map((destination) => (
              <tr key={destination.id}>
                <td>{destination.id}</td>
                <td>{destination.name}</td>
                <td>{destination.description}</td>
                <td>
                  <div className="imageAdmin">
                    <img src={destination.image_url} alt={destination.name} />
                  </div>
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

      {pageCount > 1 && (
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
            renderOnZeroPageCount={null}
          />
        </div>
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
