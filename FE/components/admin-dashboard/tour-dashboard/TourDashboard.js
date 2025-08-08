// components/tour-dashboard/TourDashboard.js
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";
import Link from 'next/link';
import UpdateTour from "@/components/admin-model/UpdateTour";
import axios from "axios";

const TourDashboard = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [infoUpdate, setInfoUpdate] = useState(null);

    const API_BASE_URL = 'http://localhost:8080';

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/tour`);

            // --- FIX START ---
            // Your backend response wraps the actual list of tours in a 'data' field.
            // So we need to access response.data.data
            if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
                const formattedTours = response.data.data.map(tour => ({
                    id: tour.id,
                    name: tour.name,
                    description: tour.description,
                    // Correctly construct the image URL.
                    // If your backend serves files via '/file/', then this path is correct.
                    imageUrl: tour.image_url ? `${API_BASE_URL}/file/${tour.image_url}` : "https://placehold.co/100x70/A0A0A0/FFFFFF?text=No+Image",
                    duration: tour.duration,
                    price: tour.price,
                    // These fields are correctly named in your TourDTO and Postman response
                    destinationName: tour.destinationName,
                    destinationCountryName: tour.destinationCountryName,
                    destinationCityName: tour.destinationCityName,
                    activityName: tour.activityName,
                    // Keep the original image_url for sending back during updates if needed
                    image_url: tour.image_url,
                    is_feature: tour.is_feature,
                    rating: tour.rating,
                    destination_id: tour.destination_id,
                    activity_id: tour.activity_id,
                    // Remove these lines as they are not properties of TourDTO and were causing confusion.
                    // If your UpdateTour component truly needs these for a *new* destination,
                    // it would need to fetch Destination details separately or handle them differently.
                    // destinationDescription: tour.description,
                    // destinationPopular: tour.popular,
                    // destinationDuration: tour.duration,
                    // destinationGoogleMapUrl: tour.google_map_url,
                    // destinationRegionName: tour.region_name,
                }));
                setTours(formattedTours);
            } else {
                // If response.data.data is not an array, or response.data is null/undefined
                // Use the message from the backend if available, otherwise a generic one.
                setError(response.data?.message || "Failed to fetch tours: Unexpected response structure or no data.");
            }
            // --- FIX END ---
        } catch (e) {
            console.error("Error fetching tours:", e);
            // Access the error message from the response if available, or use generic error.
            setError(e.response?.data?.message || e.message || "Error fetching tours. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshTours = () => {
        fetchData();
    };

    const handleUpdateClick = (tour) => {
        setInfoUpdate(tour);
        setOpenUpdate(true);
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete tour "${name}" (ID: ${id})?`)) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/tour/${id}`);
                if (response.status === 200) {
                    alert(response.data || "Tour deleted successfully!");
                    refreshTours();
                } else {
                    alert(response.data?.message || "Failed to delete tour.");
                }
            } catch (error) {
                console.error("Error deleting tour:", error);
                alert(error.response?.data?.message || error.message || "An error occurred during deletion.");
            }
        }
    };


    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading tours...</span>
                </Spinner>
                <p>Loading tours...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    <Alert.Heading>Error loading tours!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

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
                        <th>Destination</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Activity</th>
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
                                    style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x70/A0A0A0/FFFFFF?text=No+Image"; }}
                                />
                            </td>
                            <td>{tour.duration}</td>
                            <td>{tour.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            <td>{tour.destinationName}</td>
                            <td>{tour.destinationCountryName}</td>
                            <td>{tour.destinationCityName}</td>
                            <td>{tour.activityName}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center">
                                    <Link href={`/admin/tour-details?id=${tour.id}`} passHref>
                                        <Button variant="primary" size="sm" className="me-1">
                                            View
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-1"
                                        onClick={() => handleUpdateClick(tour)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(tour.id, tour.name)}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {openUpdate && infoUpdate && (
                <UpdateTour
                    openUpdate={openUpdate}
                    setOpenUpdate={setOpenUpdate}
                    infoUpdate={infoUpdate}
                    refreshTours={refreshTours}
                />
            )}
        </Container>
    );
};

export default TourDashboard;