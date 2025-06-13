"use client";   
import React from 'react';

const TourCard = ({ tour }) => {
  // Đảm bảo bạn có các thuộc tính này trong TourDTO của mình
  const { name, description, price, image_url, destination, activity } = tour;

  return (
    <div className="tour-card">
      <img src={image_url} alt={name} /> {/* Sử dụng image_url */}
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Giá: {price}</p>
      {/* Kiểm tra sự tồn tại trước khi truy cập thuộc tính name */}
      <p>Địa điểm: {destination ? destination.name : 'N/A'}</p>
      <p>Hoạt động: {activity ? activity.name : 'N/A'}</p>
      {/* Thêm các thông tin khác nếu cần */}
    </div>
  );
};

export default TourCard;