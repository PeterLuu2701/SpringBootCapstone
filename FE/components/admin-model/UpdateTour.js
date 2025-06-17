"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const UpdateTour = ({ openUpdate, setOpenUpdate, infoUpdate, refreshTours }) => {
    const [tourInfoApi, setTourInfoApi] = useState(infoUpdate);
    const [originalDestination, setOriginalDestination] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState(null);

    const API_BASE_URL = 'http://localhost:8080';

    useEffect(() => {
        if (infoUpdate) {
            setTourInfoApi({ ...infoUpdate, price: infoUpdate.price?.toString() || '' });
            setOriginalDestination({
                id: infoUpdate.destination_id,
                name: infoUpdate.destinationName,
                country: infoUpdate.destinationCountry,
                city: infoUpdate.destinationCity,
                description: infoUpdate.destinationDescription || '',
                popular: infoUpdate.destinationPopular || false,
                duration: infoUpdate.destinationDuration || '',
                google_map_url: infoUpdate.destinationGoogleMapUrl || '',
                region_name: infoUpdate.destinationRegionName || '',
                imageUrl: infoUpdate.image_url || ''
            });
        }
    }, [infoUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourInfoApi(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError(null); // Clear previous errors

        try {
            let finalTourData = { ...tourInfoApi };

            const destName = finalTourData.destinationName?.trim();
            const destCountry = finalTourData.destinationCountry?.trim();
            const destCity = finalTourData.destinationCity?.trim();
            const oldDest = originalDestination;

            // Ensure originalDestination is not null before accessing its properties
            const destinationChanged = originalDestination && (
                destName !== oldDest.name ||
                destCountry !== oldDest.country ||
                destCity !== oldDest.city
            );

            console.log("Checking if destination changed:", destinationChanged);

            if (destinationChanged) {
                console.log("Destination details have changed. Proceeding with destination check/creation.");

                // Search for existing destination
                try {
                    console.log("Attempting to search for existing destination...");
                    const searchRes = await axios.get(`${API_BASE_URL}/destination/search`, {
                        params: {
                            keyword: destName,
                            page: 0,
                            size: 5
                        }
                    });
                    console.log("Destination search response:", searchRes);

                    const destinations = Array.isArray(searchRes.data?.content) ? searchRes.data.content : [];
                    console.log("Found destinations:", destinations);

                    const matchedDestination = destinations.find(
                        (d) =>
                            d.name?.toLowerCase() === destName?.toLowerCase() &&
                            d.city?.toLowerCase() === destCity?.toLowerCase() &&
                            d.country?.toLowerCase() === destCountry?.toLowerCase()
                    );

                    if (matchedDestination) {
                        finalTourData.destination_id = matchedDestination.id;
                        console.log("✅ Found existing destination:", matchedDestination.id);
                    } else {
                        console.log("🚀 No matching destination found. Creating new destination...");

                        const formData = new FormData();
                        formData.append("name", destName);
                        formData.append("country", destCountry);
                        formData.append("city", destCity);
                        formData.append("description", oldDest.description || "");
                        formData.append("popular", oldDest.popular ? "true" : "false");
                        formData.append("duration", oldDest.duration || "");
                        formData.append("google_map_url", oldDest.google_map_url || "");
                        formData.append("region_name", oldDest.region_name || "");
                        // Ensure this is only for destination image, if applicable
                        // formData.append("imageUrl", oldDest.imageUrl || "");

                        try {
                            console.log("Sending POST request to create new destination...");
                            const createRes = await axios.post(`${API_BASE_URL}/destination`, formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            });

                            // --- CRITICAL LOGS HERE ---
                            console.log("Response from POST /destination:", createRes);
                            console.log("createRes.status:", createRes.status);
                            console.log("createRes.data:", createRes.data);
                            console.log("createRes.data.id:", createRes.data?.id); // Use optional chaining to prevent errors if data is null/undefined

                            if (createRes.status === 201 || createRes.status === 200) {
                                if (createRes.data && createRes.data.id) {
                                    finalTourData.destination_id = createRes.data.id;
                                    console.log("✅ Successfully set new destination ID:", finalTourData.destination_id);
                                } else {
                                    console.error("🔴 ERROR: createRes.data or createRes.data.id is missing/falsy.");
                                    throw new Error("Failed to retrieve ID for newly created destination.");
                                }
                            } else {
                                console.error("🔴 ERROR: Backend responded with non-success status for destination creation.");
                                throw new Error(createRes.data?.message || `Failed to create destination with status: ${createRes.status}`);
                            }
                        } catch (createDestApiError) {
                            console.error("🔴 Caught API error during new destination creation:", createDestApiError);
                            // This catch block handles network errors or non-2xx responses for the POST /destination call
                            let errorMessage = "Unknown error during destination creation.";
                            if (createDestApiError.response) {
                                errorMessage = createDestApiError.response.data?.message || `Server error: ${createDestApiError.response.status}`;
                            } else if (createDestApiError.request) {
                                errorMessage = "No response from server. Network error?";
                            } else {
                                errorMessage = createDestApiError.message;
                            }
                            throw new Error(`Error creating new destination: ${errorMessage}`);
                        }
                    }
                } catch (destCheckError) {
                    // This catches errors from the search API call or the overall destination logic block
                    console.error("🔴 Error in destination check/creation block:", destCheckError);
                    setEditError(destCheckError.message || "An error occurred during destination processing.");
                    setEditLoading(false); // Stop loading immediately
                    return; // Stop function execution
                }
            } else {
                console.log("Destination details unchanged. Using existing destination ID.");
                // Ensure destination_id is carried over if not changed
                finalTourData.destination_id = originalDestination.id;
            }

            console.log("Preparing dataToSend for Tour Update. destination_id:", finalTourData.destination_id);
            // Update tour
            const dataToSend = {
                id: finalTourData.id,
                name: finalTourData.name,
                description: finalTourData.description,
                price: parseFloat(finalTourData.price),
                duration: finalTourData.duration,
                image_url: finalTourData.image_url,
                is_feature: finalTourData.is_feature,
                rating: finalTourData.rating,
                destination_id: finalTourData.destination_id, // Ensure this is correctly populated
                activity_id: finalTourData.activity_id
            };

            console.log("Sending PUT request to update tour with data:", dataToSend);
            const updateRes = await axios.put(`${API_BASE_URL}/tour/${finalTourData.id}`, dataToSend, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("Response from PUT /tour:", updateRes);


            if (updateRes.status === 200 && updateRes.data.statusCode === 200) {
                setOpenUpdate(false);
                refreshTours();
                alert("Tour updated successfully!");
            } else {
                console.error("🔴 ERROR: Backend responded with non-success status for tour update.");
                throw new Error(updateRes.data.message || "Failed to update tour.");
            }

        } catch (err) {
            console.error("🔴 Overall Update error caught in final catch block:", err);
            setEditError(err?.response?.data?.message || err.message || "An unexpected error occurred during the update process.");
        } finally {
            setEditLoading(false);
        }
    };

    const handleClose = () => {
        setOpenUpdate(false);
        setEditError(null);
    };

    if (!tourInfoApi) return null;

    return (
        <Modal show={openUpdate} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Tour: {tourInfoApi.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editError && <Alert variant="danger">{editError}</Alert>}
                <Form onSubmit={handleUpdate}>
                    {/* ... Your Form Groups ... */}

                    <Form.Group className="mb-3">
                        <Form.Label>Tour Name</Form.Label>
                        <Form.Control type="text" name="name" value={tourInfoApi.name || ''} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={tourInfoApi.description || ''} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="text" name="duration" value={tourInfoApi.duration || ''} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={tourInfoApi.price || ''} onChange={handleChange} step="0.01" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image File Name (e.g., miami_tour.jpg)</Form.Label>
                        <Form.Control type="text" name="image_url" value={tourInfoApi.image_url || ''} onChange={handleChange} />
                        {tourInfoApi.imageUrl && (
                            <img src={tourInfoApi.imageUrl} alt="Current Tour Image" style={{ width: '150px', height: 'auto', marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x100/A0A0A0/FFFFFF?text=No+Image"; }} />
                        )}
                    </Form.Group>

                    <hr className="my-4" />
                    <h5>Destination Details</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>Destination Name</Form.Label>
                        <Form.Control type="text" name="destinationName" value={tourInfoApi.destinationName || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Destination Country</Form.Label>
                        <Form.Control type="text" name="destinationCountry" value={tourInfoApi.destinationCountry || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Destination City</Form.Label>
                        <Form.Control type="text" name="destinationCity" value={tourInfoApi.destinationCity || ''} onChange={handleChange} />
                    </Form.Group>

                    <hr className="my-4" />
                    <h5>Activity Details</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control type="text" name="activityName" value={tourInfoApi.activityName || ''} onChange={handleChange} readOnly />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={editLoading}>
                        {editLoading ? (
                            <>
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Saving...</span>
                            </>
                        ) : 'Save Changes'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateTour;