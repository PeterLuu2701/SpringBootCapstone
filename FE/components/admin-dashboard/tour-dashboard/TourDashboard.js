// components/tour-dashboard/TourDashboard.js
"use client";
import React from 'react';
import { Container, Table, Button } from "react-bootstrap";
import Link from 'next/link';

const TourDashboard = () => {
    // Dữ liệu tour mẫu (thay bằng API thật sau)
    const tours = [
        {
            id: 1,
            name: "Tour Hà Nội - Sapa 3N2Đ",
            description: "Khám phá Sapa với những thửa ruộng bậc thang và văn hóa độc đáo.",
            imageUrl: "https://images.unsplash.com/photo-1604892888425-d0f40c15404d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhcGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            duration: "3 ngày 2 đêm",
            price: 4500000, // VND
        },
        {
            id: 2,
            name: "Tour Đà Nẵng - Hội An 4N3Đ",
            description: "Tham quan các địa điểm nổi tiếng ở Đà Nẵng và Hội An.",
            imageUrl: "https://images.unsplash.com/photo-1618824409862-03e04ca8e17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RMOgIE7hurVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            duration: "4 ngày 3 đêm",
            price: 6000000,
        },
        {
           id: 3,
            name: "Tour Nha Trang 5N4Đ",
            description: "Nghỉ dưỡng tại Nha Trang với biển xanh, cát trắng.",
            imageUrl: "https://images.unsplash.com/photo-1606719404406-a6503795061c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmhhJTIwVHJhbmc проценты2MfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            duration: "5 ngày 4 đêm",
            price: 5500000,
        },
         {
            id: 4,
            name: "Tour Phú Quốc 4N3Đ",
            description: "Khám phá Phú Quốc với biển đảo hoang sơ và hải sản tươi ngon.",
            imageUrl: "https://images.unsplash.com/photo-1617627465224-a24994910209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGh1JTIwUXVvYyUyMHRvdXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            duration: "4 ngày 3 đêm",
            price: 7000000,
        },
        {
            id: 5,
            name: "Tour Cần Thơ - Miền Tây 3N2Đ",
            description: "Trải nghiệm cuộc sống miền sông nước Cần Thơ.",
            imageUrl: "https://images.unsplash.com/photo-1604928201387-597f872b3d5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FuJTIwVGhvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            duration: "3 ngày 2 đêm",
            price: 4000000,
        },
    ];

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Tour Dashboard</h2>
            <Table striped bordered hover responsive className="shadow">
                <thead className="bg-light">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour.id}>
                            <td>{tour.id}</td>
                            <td>{tour.name}</td>
                            <td>{tour.description}</td>
                            <td>
                                <img
                                    src={tour.imageUrl}
                                    alt={tour.name}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </td>
                            <td>{tour.duration}</td>
                            <td>{tour.price.toLocaleString('vi-VN')} VND</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center"> {/* Sử dụng flexbox để căn giữa */}
                                    <Link href={`/admin/tour-details/${tour.id}`} passHref>
                                        <Button variant="primary" size="sm" className="me-1"> {/* Giảm khoảng cách */}
                                            View
                                        </Button>
                                    </Link>
                                    <Button variant="warning" size="sm" className="me-1"> {/* Giảm khoảng cách */}
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TourDashboard;