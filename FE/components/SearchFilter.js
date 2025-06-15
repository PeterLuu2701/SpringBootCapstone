"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const SearchFilter = () => { 
  const [searchCriteria, setSearchCriteria] = useState({
    city: '', 
    activity: '', 
    startDate: '', 
    guest: 0, 
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); 

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/destination');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result && result.data && Array.isArray(result.data.content)) {
          const uniqueCities = new Set();
          result.data.content.forEach(dest => {
            if (dest.city) {
              uniqueCities.add(dest.city);
            }
          });
          setDestinations(Array.from(uniqueCities));
        } else {
          console.error("Unexpected API response structure for destinations:", result);
          setError("API response did not contain expected destination data.");
        }
      } catch (e) {
        console.error("Failed to fetch destinations:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    if (searchCriteria.destinationCity) { 
      router.push(`/tour-list?destination=${encodeURIComponent(searchCriteria.destinationCity)}`);
    } else {
      router.push('/tour-list');
    }
  };

  return (
    <div className="container container-1400">
      <div
        className="search-filter-inner"
        data-aos="zoom-out-down"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-map-marker-alt" />
          </div>
          <span className="title">Destinations</span>
          <select
            name="destinationCity"
            id="city"
            onChange={handleInputChange}
            value={searchCriteria.destinationCity} 
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          >
            <option value="">
              {loading ? "Loading destinations..." : (error ? "Error loading" : "City or Region")}
            </option>
            {!loading && !error && destinations.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">Error: {error}</p>}
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-calendar-alt" />
          </div>
          <span className="title">Departure Date</span>
          <input
            type="date"
            name="startDate"
            id="date"
            onChange={handleInputChange}
            value={searchCriteria.startDate}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-users" />
          </div>
          <span className="title">Guests</span>
          <select
            name="guest"
            id="cuests"
            onChange={handleInputChange}
            value={searchCriteria.guest}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          >
            {[...Array(11).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
            <option value="10+">10+</option>
          </select>
        </div>

        <div className="search-button">
          <button className="theme-btn" onClick={handleSearch}>
            <span data-hover="Search">Search</span>
            <i className="far fa-search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;