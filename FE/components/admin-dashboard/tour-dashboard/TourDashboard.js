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
            // This endpoint remains the same, as the BE for "get all" still has no path/request params.
            const response = await axios.get(`${API_BASE_URL}/tour`);

            if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
                const formattedTours = response.data.data.map(tour => ({
                    id: tour.id,
                    name: tour.name,
                    description: tour.description,
                    imageUrl: tour.image_url ? `/uploads/images/${tour.image_url}` : "https://placehold.co/100x70/A0A0A0/FFFFFF?text=No+Image",
                    duration: tour.duration,
                    price: tour.price,
                    destinationName: tour.destinationName,
                    destinationCountry: tour.destinationCountry,
                    destinationCity: tour.destinationCity,
                    activityName: tour.activityName,
                    image_url: tour.image_url,
                    is_feature: tour.is_feature, // Ensure is_feature is passed
                    rating: tour.rating,         // Ensure rating is passed
                    destination_id: tour.destination_id,
                    activity_id: tour.activity_id,
                    // Copy other destination fields if needed by UpdateTour for new destination creation
                    destinationDescription: tour.description,
                    destinationPopular: tour.popular,
                    destinationDuration: tour.duration,
                    destinationGoogleMapUrl: tour.google_map_url,
                    destinationRegionName: tour.region_name,
                }));
                setTours(formattedTours);
            } else {
                setError(response.data.message || "Failed to fetch tours: Unexpected response structure.");
            }
        } catch (e) {
            console.error("Error fetching tours:", e);
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

    // *** FE FIX: Added handleDelete function for DELETE /tour/{id} ***
    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete tour "${name}" (ID: ${id})?`)) {
            try {
                // Using path variable for DELETE
                const response = await axios.delete(`${API_BASE_URL}/tour/${id}`);
                if (response.status === 200) {
                    alert(response.data || "Tour deleted successfully!");
                    refreshTours(); // Refresh the list after deletion
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
                            <td>{tour.destinationCountry}</td>
                            <td>{tour.destinationCity}</td>
                            <td>{tour.activityName}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center">
                                    {/* The Link to tour-details page remains as query param. */}
                                    {/* The actual GET /tour/{id} API call will be made on the tour-details page. */}
                                    {/* That page will need to extract the ID from the query param and use it in the path. */}
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
                                    {/* *** FE FIX: Updated Delete button to call handleDelete with path variable *** */}
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