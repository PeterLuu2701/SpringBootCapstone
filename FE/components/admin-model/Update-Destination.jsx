import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateDestination = ({
  openUpdate,
  setOpenUpdate,
  infoUpdate,
  setDestinations,
}) => {
  // State to hold the data for the API update (mirrors DestinationDTO)
  const [infoUpdateApi, setInfoUpdateApi] = useState(infoUpdate);
  // State for the selected file input for image upload
  const [selectedFile, setSelectedFile] = useState(null);

  // States to hold the lists of countries and cities for dropdowns
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  // States to manage the currently selected IDs in the dropdowns
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  // State to indicate if cities are currently being loaded
  const [loadingCities, setLoadingCities] = useState(false);

  // --- Effects for Data Initialization and Fetching ---

  // Effect 1: Initialize form state when the infoUpdate prop changes (i.e., when a new destination is selected for editing)
  useEffect(() => {
    // Set the form data from the prop
    setInfoUpdateApi(infoUpdate);

    // Set the initial selected country and city for the dropdowns
    if (infoUpdate.countryId) {
      setSelectedCountryId(String(infoUpdate.countryId));
      // Note: No need to fetch cities here, the second useEffect will handle it based on selectedCountryId
    } else {
      setSelectedCountryId("");
    }

    if (infoUpdate.cityId) {
      setSelectedCityId(String(infoUpdate.cityId));
    } else {
      setSelectedCityId("");
    }

    // Reset selected file input whenever the modal is opened for a new destination
    setSelectedFile(null);
  }, [infoUpdate]); // Dependency on infoUpdate ensures this runs when the selected destination changes

  // Effect 2: Fetch all countries when the modal opens
  useEffect(() => {
    if (openUpdate) { // Only fetch when the modal is visible
      const fetchCountriesData = async () => {
        try {
          // Assuming your backend endpoint for all countries is /country
          const res = await axios.get("http://localhost:8080/country");
          if (res.data && Array.isArray(res.data.data)) {
            setCountries(res.data.data);
          } else {
            console.error("Unexpected response structure for countries:", res.data);
            setCountries([]);
          }
        } catch (error) {
          console.error("Error fetching countries:", error);
          setCountries([]);
        }
      };
      fetchCountriesData();
    }
  }, [openUpdate]); // Dependency on openUpdate ensures this runs when the modal's visibility changes

  // Effect 3: Fetch cities based on the selected country ID
  useEffect(() => {
    if (selectedCountryId) { // Only fetch if a country is actually selected
      setLoadingCities(true); // Start loading cities
      const fetchCitiesData = async () => {
        try {
          // Assuming your backend endpoint for cities by country is /city/by-country/{countryId}
          const res = await axios.get(
            `http://localhost:8080/city/by-country/${selectedCountryId}`
          );
          if (res.data && Array.isArray(res.data.data)) {
            setCities(res.data.data);
            // If the current city is no longer in the list of cities for the new country, clear it
            if (
              infoUpdateApi.cityId &&
              !res.data.data.some((city) => String(city.id) === String(infoUpdateApi.cityId))
            ) {
              setInfoUpdateApi((prev) => ({ ...prev, cityId: "" }));
              setSelectedCityId("");
            }
          } else {
            console.error(
              `Unexpected response structure for cities of country ${selectedCountryId}:`,
              res.data
            );
            setCities([]);
            setInfoUpdateApi((prev) => ({ ...prev, cityId: "" }));
            setSelectedCityId("");
          }
        } catch (error) {
          console.error(
            `Error fetching cities for country ${selectedCountryId}:`,
            error
          );
          setCities([]); // Clear cities on error
          setInfoUpdateApi((prev) => ({ ...prev, cityId: "" }));
          setSelectedCityId("");
        } finally {
          setLoadingCities(false); // Stop loading cities
        }
      };
      fetchCitiesData();
    } else {
      // If no country is selected, clear cities list and city selection
      setCities([]);
      setSelectedCityId("");
      setInfoUpdateApi((prev) => ({ ...prev, cityId: "" }));
    }
  }, [selectedCountryId, infoUpdateApi.cityId]); // Dependencies: selectedCountryId and current cityId for re-evaluation

  // --- Handlers for Form Inputs ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfoUpdateApi((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Get the first file selected by the user
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId); // Update the state for the selected country dropdown
    // Update the form data with the new countryId and reset cityId
    setInfoUpdateApi((prev) => ({ ...prev, countryId: countryId, cityId: "" }));
    setSelectedCityId(""); // Reset the selected city in the UI dropdown
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId); // Update the state for the selected city dropdown
    setInfoUpdateApi((prev) => ({ ...prev, cityId: cityId })); // Update the form data with the new cityId
  };

  // --- Handle Form Submission ---

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Append ID first, as it's required for update operations
      formData.append("id", infoUpdateApi.id);

      // Append image file if a new one is selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      // If no new file is selected, but an old imageUrl exists, send it
      // This helps the backend retain the existing image if no new one is uploaded
      else if (infoUpdateApi.imageUrl) {
        formData.append("imageUrl", infoUpdateApi.imageUrl);
      }

      // Append other text fields from infoUpdateApi (make sure names match backend DTO)
      formData.append("name", infoUpdateApi.name);
      formData.append("description", infoUpdateApi.description);
      formData.append("countryId", infoUpdateApi.countryId); // Sending country ID
      formData.append("cityId", infoUpdateApi.cityId); // Sending city ID
      formData.append("popular", infoUpdateApi.popular);
      formData.append("duration", infoUpdateApi.duration);

      // Make the PUT request to update the destination
      const response = await axios.put(
        "http://localhost:8080/destination", // Your backend update endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Essential for file uploads
          },
        }
      );

      if (response.status === 200) {
        setOpenUpdate(false); // Close the modal on successful update
        setSelectedFile(null); // Clear any selected file after successful upload

        // Call the parent component's refresh function to update the destination list
        if (typeof setDestinations === "function") {
          setDestinations();
        }
      } else {
        console.error("Failed to update data. Status:", response.status);
        alert("Failed to update destination.");
      }
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response ? error.response.data : error.message
      );
      alert("Error updating destination. Please check console for details.");
    }
  };

  return (
    <div
      className={"modal fade" + (openUpdate ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openUpdate ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        overflowY: "auto", // Allow modal content to scroll if it overflows
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Destination</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={() => {
                setOpenUpdate(false);
                setSelectedFile(null); // Clear selected file when closing the modal
                // The form fields (infoUpdateApi) will reset on next open via infoUpdate prop
                // Country/City dropdowns will reset via their state management
              }}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              {/* Name Destination */}
              <div className="flex flex-col">
                <label className="font-medium">Name Destination</label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.name || ""}
                  name="name"
                  onChange={handleChange}
                />
              </div>

              {/* Description Destination */}
              <div className="flex flex-col">
                <label className="font-medium">Description Destination</label>
                <textarea
                  placeholder="Enter Description"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.description || ""}
                  name="description"
                  onChange={handleChange}
                />
              </div>

              {/* Country Dropdown */}
              <div className="flex flex-col">
                <label className="font-medium">Country</label>
                <select
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="countryId" // Matches backend DestinationDTO field
                  value={selectedCountryId} // Controlled by local state
                  onChange={handleCountryChange}
                >
                  <option value="">Select a Country</option>
                  {(countries || []).map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div className="flex flex-col">
                <label className="font-medium">City</label>
                <select
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="cityId" // Matches backend DestinationDTO field
                  value={selectedCityId} // Controlled by local state
                  onChange={handleCityChange}
                  // Disable if no country is selected, cities are loading, or no cities available for selected country
                  disabled={!selectedCountryId || loadingCities || cities.length === 0}
                >
                  <option value="">Select a City</option>
                  {loadingCities ? (
                    <option disabled>Loading cities...</option>
                  ) : cities.length === 0 ? (
                    <option disabled>No cities available</option>
                  ) : (
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Image Input and Display */}
              <div className="flex flex-col">
                <label className="font-medium">Image</label>
                <input
                  type="file"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="file" // Use 'file' for FormData when sending the file itself
                  onChange={handleFileChange}
                />
                {infoUpdateApi.imageUrl && !selectedFile && ( // Show current image if exists and no new file selected
                  <div className="mt-2">
                    <p>Current Image:</p>
                    <img
                      src={infoUpdateApi.imageUrl}
                      alt="Current Destination"
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                  </div>
                )}
                {selectedFile && ( // Show preview of newly selected image
                  <div className="mt-2">
                    <p>New Image Preview:</p>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="New Destination"
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                  </div>
                )}
              </div>

              {/* Popular Checkbox */}
              <div className="flex flex-col">
                <label className="font-medium">Popular</label>
                <br />
                <input
                  type="checkbox"
                  name="popular"
                  checked={infoUpdateApi.popular || false}
                  onChange={handleChange}
                  className="custom-checkbox border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <span>{infoUpdateApi.popular ? "true" : "false"}</span>
              </div>

              {/* Duration Input */}
              <div className="flex flex-col col-span-2">
                <label className="font-medium">Duration</label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.duration || ""}
                  name="duration"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setOpenUpdate(false);
                setSelectedFile(null); // Clear selected file when closing
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDestination;