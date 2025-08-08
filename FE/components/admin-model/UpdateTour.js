// components/admin-model/UpdateTour.js
"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const UpdateTour = ({ openUpdate, setOpenUpdate, infoUpdate, refreshTours }) => {
    const [tourInfoApi, setTourInfoApi] = useState(infoUpdate);
    const [originalDestination, setOriginalDestination] = useState(null); // Keep this for comparison
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState(null);

    // New states for dropdowns
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [destinations, setDestinations] = useState([]); // To store available destinations
    const [selectedDestinationId, setSelectedDestinationId] = useState('');


    const API_BASE_URL = 'http://localhost:8080';

    // Fetch Countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/country`);
                // Assuming your country endpoint directly returns a list
                if (response.status === 200 && Array.isArray(response.data)) {
                    setCountries(response.data);
                } else {
                    console.error("Failed to fetch countries: Unexpected response structure", response.data);
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
                setEditError("Error loading countries. Please try again.");
            }
        };

        const fetchDestinations = async () => {
            try {
                // Fetch all destinations to populate the dropdown
                // You might want to implement pagination or search if there are too many destinations
                const response = await axios.get(`${API_BASE_URL}/destination`);
                if (response.status === 200 && response.data && Array.isArray(response.data.content)) {
                    setDestinations(response.data.content);
                } else {
                    console.error("Failed to fetch destinations: Unexpected response structure", response.data);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
                setEditError("Error loading destinations. Please try again.");
            }
        };


        fetchCountries();
        fetchDestinations();
    }, []);

    // Effect to set initial form values when infoUpdate changes
    useEffect(() => {
        if (infoUpdate) {
            setTourInfoApi({ ...infoUpdate, price: infoUpdate.price?.toString() || '' });
            setOriginalDestination({
                id: infoUpdate.destination_id,
                name: infoUpdate.destinationName,
                // These are now less relevant for direct input, but good for comparison
                country: infoUpdate.destinationCountryName, // Use countryName from TourDTO
                city: infoUpdate.destinationCityName,     // Use cityName from TourDTO
                description: infoUpdate.destinationDescription || '',
                popular: infoUpdate.destinationPopular || false,
                duration: infoUpdate.destinationDuration || '',
                google_map_url: infoUpdate.destinationGoogleMapUrl || '',
                region_name: infoUpdate.destinationRegionName || '',
                imageUrl: infoUpdate.image_url || ''
            });

            // Set initial selected destination ID for the dropdown
            setSelectedDestinationId(infoUpdate.destination_id || '');

            // Optionally, if you want to initialize country/city dropdowns based on the tour's destination
            // This might require fetching the full DestinationDTO if CountryId/CityId aren't directly in TourDTO
            // For now, we'll rely on the selectedDestinationId
        }
    }, [infoUpdate]);


    // Effect to fetch cities when a country is selected
    useEffect(() => {
        if (selectedCountryId) {
            const fetchCitiesByCountry = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/city/by-country/${selectedCountryId}`);
                    // Assuming your city endpoint directly returns a list
                    if (response.status === 200 && Array.isArray(response.data)) {
                        setCities(response.data);
                    } else {
                        console.error("Failed to fetch cities: Unexpected response structure", response.data);
                    }
                } catch (error) {
                    console.error("Error fetching cities for country ID:", selectedCountryId, error);
                    setEditError("Error loading cities. Please try again.");
                }
            };
            fetchCitiesByCountry();
        } else {
            setCities([]); // Clear cities if no country is selected
            setSelectedCityId(''); // Clear selected city
        }
    }, [selectedCountryId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourInfoApi(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle change for Destination dropdown
    const handleDestinationChange = (e) => {
        const newDestinationId = e.target.value;
        setSelectedDestinationId(newDestinationId);

        // Update tourInfoApi with the new destination ID
        setTourInfoApi(prev => ({
            ...prev,
            destination_id: newDestinationId === "" ? null : Number(newDestinationId)
        }));
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError(null);

        try {
            let finalTourData = { ...tourInfoApi };

            // When using dropdowns, the destination_id is directly set by selectedDestinationId
            // The previous complex logic for checking/creating destinations based on name/country/city
            // is now largely irrelevant for existing destinations.
            // If the goal is to allow creating a *new* destination through this modal,
            // you'd need a separate flow for that, not just string comparisons.
            // For now, we assume the user selects an existing destination.
            if (!selectedDestinationId) {
                 throw new Error("Please select a destination.");
            }
            finalTourData.destination_id = Number(selectedDestinationId);


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
                destination_id: finalTourData.destination_id, // This is now directly from the dropdown
                activity_id: finalTourData.activity_id
            };

            // You'll also need to handle the imageFile update if there's a file input in your form.
            // The existing backend `updateTour` method takes a MultipartFile.
            // If you add a file input, you'll need to use FormData for the entire request.
            // For now, assuming you're just updating text fields or using the existing image_url string.
            // If you intend to allow uploading a new image, you'll need to convert this to FormData.

            console.log("Sending PUT request to update tour with data:", dataToSend);
            const updateRes = await axios.put(`${API_BASE_URL}/tour/${finalTourData.id}`, dataToSend, {
                headers: { "Content-Type": "application/json" } // Keep as JSON if no file upload
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

                    {/* Destination Dropdown */}
                    <Form.Group className="mb-3">
                        <Form.Label>Select Destination</Form.Label>
                        <Form.Select
                            name="destination_id"
                            value={selectedDestinationId}
                            onChange={handleDestinationChange}
                            required
                        >
                            <option value="">Select a Destination</option>
                            {destinations.map((dest) => (
                                <option key={dest.id} value={dest.id}>
                                    {dest.name} ({dest.cityName}, {dest.countryName})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Removed individual country and city text fields */}
                    {/* These are now implicitly handled by the selected destination */}
                    {/* If you need to *create* a new destination from here, that's a more complex workflow */}
                    {/* and would require separate forms/modals for country/city creation, then linking them. */}


                    <hr className="my-4" />
                    <h5>Activity Details</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        {/* Assuming activityName is read-only based on your previous code */}
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