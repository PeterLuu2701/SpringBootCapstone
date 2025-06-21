import axios from "axios";
import React, { useState, useEffect } from "react";

const AddDestination = ({ openAdd, setOpenAdd, setDestinations }) => {
  const [infoAdd, setInfoAdd] = useState({
    name: "",
    description: "",
    countryId: "", 
    cityId: "",     
    popular: true,
    duration: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); 

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  // Fetch all countries when the modal opens
  useEffect(() => {
    if (openAdd) {
      const fetchCountries = async () => {
        try {
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
      fetchCountries();
    }
  }, [openAdd]);

  // Fetch cities when selectedCountryId changes
  useEffect(() => {
    if (selectedCountryId) {
      const fetchCities = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/city/by-country/${selectedCountryId}`);
          if (res.data && Array.isArray(res.data.data)) {
            setCities(res.data.data);
          } else {
            console.error(`Unexpected response structure for cities of country ${selectedCountryId}:`, res.data);
            setCities([]);
          }
          setSelectedCityId(""); // Reset city selection when country changes
          setInfoAdd((prev) => ({ ...prev, city_id: "" })); // Also clear city_id in infoAdd
        } catch (error) {
          console.error(`Error fetching cities for country ${selectedCountryId}:`, error);
          setCities([]); // Clear cities on error
          setSelectedCityId("");
          setInfoAdd((prev) => ({ ...prev, city_id: "" }));
        }
      };
      fetchCities();
    } else {
      setCities([]); // Clear cities if no country is selected
      setSelectedCityId("");
      setInfoAdd((prev) => ({ ...prev, city_id: "" }));
    }
  }, [selectedCountryId]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfoAdd((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Get the first file selected
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    setInfoAdd((prev) => ({ ...prev, country_id: countryId, city_id: "" })); // Update country_id and reset city_id
    setSelectedCityId(""); // Reset selected city
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    setInfoAdd((prev) => ({ ...prev, city_id: cityId })); // Update city_id
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();

      // Append image file if selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Append other text fields from infoAdd
      // Note: Backend @ModelAttribute DestinationDTO expects fields directly
      formData.append("name", infoAdd.name);
      formData.append("description", infoAdd.description);
      formData.append("country_id", infoAdd.country_id); // Sending ID
      formData.append("city_id", infoAdd.city_id);       // Sending ID
      formData.append("popular", infoAdd.popular);
      formData.append("duration", infoAdd.duration);

      // Make the POST request
      await axios.post("http://localhost:8080/destination", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      // Reset state and close modal on success
      setOpenAdd(false);
      setInfoAdd({ // Reset all form fields
        name: "",
        description: "",
        countryId: "",
        cityId: "",
        popular: true,
        duration: "",
      });
      setSelectedFile(null);
      setSelectedCountryId("");
      setSelectedCityId("");
      // No need to clear countries/cities arrays here, they'll re-fetch on next open
      // or remain cached if the component doesn't unmount fully.


      // Call parent to refresh destinations
      if (typeof setDestinations === "function") {
        setDestinations();
      }
    } catch (error) {
      console.error("Error adding destination:", error.response ? error.response.data : error.message);
      alert("Error adding destination. Please check console for details.");
    }
  };

  return (
    <div
      className={"modal fade" + (openAdd ? " show d-block" : " d-none")}
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
        overflowY: "auto", // Ensure modal is scrollable if content overflows
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Destination</h5>
            <button
              type="button"
              className="close"
              style={{
                width: "40px",
              }}
              onClick={() => {
                setOpenAdd(false);
                // Reset form state when closing
                setInfoAdd({
                  name: "",
                  description: "",
                  countryId: "",
                  cityId: "",
                  popular: true,
                  duration: "",
                });
                setSelectedFile(null);
                setSelectedCountryId("");
                setSelectedCityId("");
                // No need to clear countries/cities, they are handled by useEffect on openAdd change
              }}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Name Destination</label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="name"
                  value={infoAdd.name} // Add value prop for controlled input
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Description Destination</label>
                <textarea
                  placeholder="Enter Description"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="description"
                  value={infoAdd.description} // Add value prop
                  onChange={handleChange}
                />
              </div>
              {/* Country Dropdown */}
              <div className="flex flex-col">
                <label className="font-medium">Country</label>
                <select
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="country_id"
                  value={selectedCountryId}
                  onChange={handleCountryChange}
                >
                  <option value="">Select a Country</option>
                  {countries.map((country) => (
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
                  name="city_id"
                  value={selectedCityId}
                  onChange={handleCityChange}
                  disabled={!selectedCountryId || cities.length === 0} // Disable if no country selected or no cities
                >
                  <option value="">Select a City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Image File Input */}
              <div className="flex flex-col">
                <label className="font-medium">Image</label>
                <input
                  type="file" // Change to type="file"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="imageFile" // Use 'imageFile' as per backend DTO
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Popular</label>
                <br />
                <input
                  type="checkbox"
                  name="popular"
                  checked={infoAdd.popular}
                  onChange={handleChange}
                  className="custom-checkbox border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <span>{infoAdd.popular ? "true" : "false"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium">Duration</label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="duration"
                  value={infoAdd.duration} 
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
                setOpenAdd(false);
                // Reset form state on close
                setInfoAdd({
                  name: "",
                  description: "",
                  countryId: "",
                  cityId: "",
                  popular: true,
                  duration: "",
                });
                setSelectedFile(null);
                setSelectedCountryId("");
                setSelectedCityId("");
              }}
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