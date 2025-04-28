<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Link from "next/link"; // Import Link
import UpdateDestination from "@/components/admin-model/Update-Destination";
import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import AddDestination from "@/components/admin-model/Add-Destination";
import DeleteDestination from "@/components/admin-model/Delete-Destination";
import axios from "axios";
const DestinationDashboard = () => {
  // Dữ liệu điểm đến mẫu (thay bằng API thật sau)
  // const destinations = [
  //   {
  //     id: 1,
  //     name: "Sapa",
  //     description:
  //       "Thị trấn sương mù với những thửa ruộng bậc thang tuyệt đẹp.",
  //     country: "Vietnam",
  //     city: "Lào Cai",
  //     image_url:
  //       "https://images.unsplash.com/photo-1544558895-a89429d6ef6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FwYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "3-4 days",
  //   },
  //   {
  //     id: 2,
  //     name: "Đà Nẵng",
  //     description: "Thành phố biển xinh đẹp với những cây cầu nổi tiếng.",
  //     country: "Vietnam",
  //     city: "Đà Nẵng",
  //     image_url:
  //       "https://images.unsplash.com/photo-1618824409862-03e04ca8e17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RMOgIE7hurVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "2-3 days",
  //   },
  //   {
  //     id: 3,
  //     name: "Hội An",
  //     description: "Phố cổ với những ngôi nhà cổ kính và đèn lồng lung linh.",
  //     country: "Vietnam",
  //     city: "Quảng Nam",
  //     image_url:
  //       "https://images.unsplash.com/photo-1599400492176-9928916bb8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9pJTIwQW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "2 days",
  //   },
  //   {
  //     id: 4,
  //     name: "Nha Trang",
  //     description:
  //       "Thành phố biển với bãi cát trắng mịn và làn nước trong xanh.",
  //     country: "Vietnam",
  //     city: "Khánh Hòa",
  //     image_url:
  //       "https://images.unsplash.com/photo-1606719404406-a6503795061c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmhhJTIwVHJhbmc проценты2MfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  //     popular: false,
  //     duration: "3 days",
  //   },
  //   {
  //     id: 5,
  //     name: "Phú Quốc",
  //     description: "Đảo ngọc với những bãi biển hoang sơ và hải sản tươi ngon.",
  //     country: "Vietnam",
  //     city: "Kiên Giang",
  //     image_url:
  //       "https://images.unsplash.com/photo-1617627465224-a24994910209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGh1JTIwUXVvYyUyMHRvdXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "4-5 days",
  //   },
  // ];

  const [destinations, setDestinations] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nameDelete, setNameDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");

  const [infoUpdate, setInfoUpdate] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/destination");
        console.log("Check res:", res.data);
        setDestinations(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDestinations([]);
      }
    };

    fetchData();
  }, []);
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
=======
"use client";

import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Link from "next/link"; // Import Link
import UpdateDestination from "@/components/admin-model/Update-Destination";
import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import AddDestination from "@/components/admin-model/Add-Destination";
import DeleteDestination from "@/components/admin-model/Delete-Destination";
import axios from "axios";
const DestinationDashboard = () => {
  // Dữ liệu điểm đến mẫu (thay bằng API thật sau)
  // const destinations = [
  //   {
  //     id: 1,
  //     name: "Sapa",
  //     description:
  //       "Thị trấn sương mù với những thửa ruộng bậc thang tuyệt đẹp.",
  //     country: "Vietnam",
  //     city: "Lào Cai",
  //     image_url:
  //       "https://images.unsplash.com/photo-1544558895-a89429d6ef6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FwYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "3-4 days",
  //   },
  //   {
  //     id: 2,
  //     name: "Đà Nẵng",
  //     description: "Thành phố biển xinh đẹp với những cây cầu nổi tiếng.",
  //     country: "Vietnam",
  //     city: "Đà Nẵng",
  //     image_url:
  //       "https://images.unsplash.com/photo-1618824409862-03e04ca8e17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RMOgIE7hurVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "2-3 days",
  //   },
  //   {
  //     id: 3,
  //     name: "Hội An",
  //     description: "Phố cổ với những ngôi nhà cổ kính và đèn lồng lung linh.",
  //     country: "Vietnam",
  //     city: "Quảng Nam",
  //     image_url:
  //       "https://images.unsplash.com/photo-1599400492176-9928916bb8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9pJTIwQW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "2 days",
  //   },
  //   {
  //     id: 4,
  //     name: "Nha Trang",
  //     description:
  //       "Thành phố biển với bãi cát trắng mịn và làn nước trong xanh.",
  //     country: "Vietnam",
  //     city: "Khánh Hòa",
  //     image_url:
  //       "https://images.unsplash.com/photo-1606719404406-a6503795061c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmhhJTIwVHJhbmc проценты2MfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  //     popular: false,
  //     duration: "3 days",
  //   },
  //   {
  //     id: 5,
  //     name: "Phú Quốc",
  //     description: "Đảo ngọc với những bãi biển hoang sơ và hải sản tươi ngon.",
  //     country: "Vietnam",
  //     city: "Kiên Giang",
  //     image_url:
  //       "https://images.unsplash.com/photo-1617627465224-a24994910209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGh1JTIwUXVvYyUyMHRvdXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     popular: true,
  //     duration: "4-5 days",
  //   },
  // ];

  const [destinations, setDestinations] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nameDelete, setNameDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");

  const [infoUpdate, setInfoUpdate] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/destination");
        console.log("Check res:", res.data);
        setDestinations(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDestinations([]);
      }
    };

    fetchData();
  }, []);
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
>>>>>>> 23d3403304c0b8000d8c90b62cc15a64eb81fecd
=======
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
<<<<<<< HEAD
=======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/destination");
        console.log("Check res:", res.data);
        setDestinations(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDestinations([]);
      }
    };
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a

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
>>>>>>> destination
