

"use client"; 

import React, { useState } from 'react';
const SearchFilter = ({ onSearch }) => { // Bỏ onError và onSearchStart
  const [searchCriteria, setSearchCriteria] = useState({
    destination: '',
    activity: '',
    startDate: '',
    guest: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Hàm này CHỈ cần gọi onSearch và truyền criteria
  const handleSearch = () => {
    // Bỏ logic gọi API ở đây
    // Bỏ gọi onSearchStart và onError
    if (onSearch) {
        onSearch(searchCriteria); // Truyền state searchCriteria lên component cha
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
          <select name="destination" id="city" onChange={handleInputChange} value={searchCriteria.destination}>
            <option value="">City or Region</option>
            {/* TODO: Thay thế bằng dữ liệu điểm đến thực tế */}
            <option value="City">City</option>
            <option value="Region">Region</option>
          </select>
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-flag" />
          </div>
          <span className="title">All Activity</span>
          <select name="activity" id="activity" onChange={handleInputChange} value={searchCriteria.activity}>
            <option value="">Choose Activity</option>
             {/* TODO: Thay thế bằng dữ liệu hoạt động thực tế */}
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
          </select>
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
          />
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-users" />
          </div>
          <span className="title">Guests</span>
          <select name="guest" id="cuests" onChange={handleInputChange} value={searchCriteria.guest}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
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