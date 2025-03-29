"use client";

import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import Link from 'next/link'; // Import Link

const DestinationDashboard = () => {
    // Dữ liệu điểm đến mẫu (thay bằng API thật sau)
    const destinations = [
        {
            id: 1,
            name: "Sapa",
            description: "Thị trấn sương mù với những thửa ruộng bậc thang tuyệt đẹp.",
            imageUrl: "https://images.unsplash.com/photo-1544558895-a89429d6ef6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FwYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            location: "Lào Cai",
        },
        {
            id: 2,
            name: "Đà Nẵng",
            description: "Thành phố biển xinh đẹp với những cây cầu nổi tiếng.",
            imageUrl: "https://images.unsplash.com/photo-1618824409862-03e04ca8e17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RMOgIE7hurVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            location: "Đà Nẵng",
        },
        {
            id: 3,
            name: "Hội An",
            description: "Phố cổ với những ngôi nhà cổ kính và đèn lồng lung linh.",
            imageUrl: "https://images.unsplash.com/photo-1599400492176-9928916bb8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9pJTIwQW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            location: "Quảng Nam",
        },
        {
            id: 4,
            name: "Nha Trang",
            description: "Thành phố biển với bãi cát trắng mịn và làn nước trong xanh.",
            imageUrl: "https://images.unsplash.com/photo-1606719404406-a6503795061c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmhhJTIwVHJhbmc проценты2MfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            location: "Khánh Hòa",
        },
        {
            id: 5,
            name: "Phú Quốc",
            description: "Đảo ngọc với những bãi biển hoang sơ và hải sản tươi ngon.",
            imageUrl: "https://images.unsplash.com/photo-1617627465224-a24994910209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGh1JTIwUXVvYyUyMHRvdXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            location: "Kiên Giang",
        },
    ];

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Destination Dashboard</h2>
            <Table striped bordered hover responsive className="shadow">
                <thead className="bg-light">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Location</th>
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
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </td>
                            <td>{destination.location}</td>
                            <td className="text-center">
                                <Link href={`/admin/destination-details/${destination.id}`} passHref>
                                    <Button variant="primary" size="sm" className="me-2">
                                        View
                                    </Button>
                                </Link>
                                <Button variant="warning" size="sm" className="me-2">
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

export default DestinationDashboard;