"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchFilter = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    tourName: "",
  });

  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Redirect to /tour-list with tourName as a query parameter
    router.push(
      `/tour-list${
        searchCriteria.tourName
          ? `?tourName=${encodeURIComponent(searchCriteria.tourName)}`
          : ""
      }`
    );
  };

  return (
    <div className="container">
      <div
        className="search-filter-inner"
        data-aos="zoom-out-down"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="filter-item clearfix w-full">
          <div className="icon">
            <i className="fal fa-map-marker-alt" />
          </div>
          <span className="title">Tour Name</span>
          <input
            type="text"
            name="tourName"
            id="tourName"
            placeholder="Enter tour name"
            onChange={handleInputChange}
            value={searchCriteria.tourName}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
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
