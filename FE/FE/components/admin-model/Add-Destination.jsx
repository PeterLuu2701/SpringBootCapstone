"use client";

import axios from "axios";
import React, { useState } from "react";

const AddDestination = ({ openAdd, setOpenAdd, setDestinations }) => {
  const [infoAdd, setInfoAdd] = useState({
    name: "",
    description: "",
    country: "",
    city: "",
    image_url: "",
    popular: true,
    duration: "",
    google_map_url: "", // Added to match API structure
  });
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfoAdd((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!infoAdd.name.trim()) {
      setError("Destination name is required.");
      return false;
    }
    if (!infoAdd.image_url.trim()) {
      setError("Image URL is required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_URL}/destination`, infoAdd);
      const newDestination = response.data.data; // Assuming API returns the created destination
      setOpenAdd(false);
      // Update destinations in parent component
      if (typeof setDestinations === "function") {
        setDestinations((prev) => [...prev, newDestination]);
      }
      // Reset form
      setInfoAdd({
        name: "",
        description: "",
        country: "",
        city: "",
        image_url: "",
        popular: true,
        duration: "",
        google_map_url: "",
      });
    } catch (error) {
      console.error("Error adding destination:", error);
      setError("Failed to add destination. Please try again.");
    }
  };

  return (
    <div
      className={`modal fade ${openAdd ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openAdd ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Destination</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenAdd(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            {error && (
              <div className="text-center text-red-500 mb-4">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium">
                  Name Destination
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Destination"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="name"
                  value={infoAdd.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter Description"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="description"
                  value={infoAdd.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="font-medium">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="Enter Country"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="country"
                  value={infoAdd.country}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="font-medium">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter City"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="city"
                  value={infoAdd.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="image_url" className="font-medium">
                  Image URL
                </label>
                <input
                  id="image_url"
                  type="text"
                  placeholder="Enter Image URL"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="image_url"
                  value={infoAdd.image_url}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="popular" className="font-medium">
                  Popular
                </label>
                <input
                  id="popular"
                  type="checkbox"
                  name="popular"
                  checked={infoAdd.popular}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="duration" className="font-medium">
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  placeholder="Enter Duration"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="duration"
                  value={infoAdd.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="google_map_url" className="font-medium">
                  Google Map URL
                </label>
                <input
                  id="google_map_url"
                  type="text"
                  placeholder="Enter Google Map URL"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="google_map_url"
                  value={infoAdd.google_map_url}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenAdd(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;
