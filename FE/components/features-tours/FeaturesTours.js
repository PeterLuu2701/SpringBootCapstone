// components/features-tours/FeaturesTours.js
"use client"; // Component này là Client Component

import React, { useState, useEffect } from "react";
import Link from "next/link";

const FeaturesTours = () => { // Giữ nguyên tên component FeaturesTours
  const [featuresTours, setFeaturesTours] = useState([]); // Đổi tên state cho rõ nghĩa hơn
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Định nghĩa URL gốc của backend
  const backendBaseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchFeaturesTours = async () => { // Đổi tên hàm fetch
      try {
        setLoading(true);
        setError(null);
        // Fetch từ endpoint get-all-tour
        const response = await fetch(`${backendBaseUrl}/tour`, { cache: 'no-store' }); // Sử dụng biến backendBaseUrl
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error: ${response.status}, body: ${errorText}`);
        }
        const data = await response.json();
        console.log("API Response for Features Tours:", data);
        // Lấy mảng tour từ data
         const allTours = data.data && Array.isArray(data.data) ? data.data : [];

        // Lọc các tour có is_feature === "1" (hoặc cách filter khác tùy backend)
        // Nếu bạn muốn hiển thị TẤT CẢ tour trong section này, bỏ dòng filter này
        const filteredTours = allTours.filter(tour => tour.is_feature === "1"); // Giả định lọc Featured Tours

        setFeaturesTours(filteredTours); // Set state
      } catch (error) {
        console.error("Error fetching features tours:", error);
        setError(error.message);
        setFeaturesTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturesTours(); // Gọi hàm fetch
  }, []);

  if (loading) {
    return <div className="text-center">Loading features tours...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading features tours: {error}</div>;
  }

  // Kiểm tra nếu featuresTours là mảng và không rỗng trước khi render
  if (!Array.isArray(featuresTours) || featuresTours.length === 0) {
      return <div className="text-center">No featured tours available.</div>;
  }


  return (
    <div className="row justify-content-center">
      {featuresTours.map((tour) => { // Sử dụng state đã đổi tên
          // TẠO URL ẢNH ĐẦY ĐỦ CHÍNH XÁC TẠI ĐÂY
          // Ghép backendBaseUrl với image_url từ DTO
          const fullImageUrl = tour.image_url ? `${backendBaseUrl}${tour.image_url}` : null;

          return (
            <div className="col-xl-3 col-lg-4 col-md-6" key={tour.id}>
              <div
                className="destination-item style-four no-border" // Giữ nguyên class của template gốc
                data-aos="flip-left" // Giữ lại data-aos nếu không dùng slider
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  {/* Bạn có thể hiển thị discount hoặc other badges ở đây nếu có data */}
                  {/* <span className="badge">10% Off</span> */}
                  <a href="#" className="heart"><i className="fas fa-heart" /></a>
                  {/* SỬ DỤNG fullImageUrl CHO THẺ ẢNH */}
                  {/* Cùng logic kiểm tra và hiển thị placeholder như Destination component */}
                  {fullImageUrl ? (
                      <img src={fullImageUrl} alt={tour.name || "Tour Image"} /> // Thêm alt mặc định
                  ) : (
                      // Placeholder nếu không có ảnh, điều chỉnh kích thước cho phù hợp container
                      // Có thể cần điều chỉnh style placeholder cho phù hợp với layout "style-four"
                       <div style={{ width: '100%', height: '200px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>No Image Available</div>
                  )}
                </div>
                <div className="content">
                  <span className="location">
                    <i className="fal fa-map-marker-alt" />
                    {/* Hiển thị location từ DTO tour */}
                     {`${tour.destinationCity || ''}${tour.destinationCity && tour.destinationCountry ? ', ' : ''}${tour.destinationCountry || ''}` || 'Unknown Location'}
                  </span>
                  <h6>
                    {/* Link đến trang chi tiết Tour */}
                    <Link href={`/tour-details?id=${tour.id}`}>
                      {tour.name} {/* Sử dụng tour.name cho tiêu đề chính */}
                    </Link>
                  </h6>
                   {/* Có thể hiển thị description ở đây nếu cần */}
                   {/* <p>{tour.description}</p> */}
                </div>
                <div className="destination-footer">
                  <span className="price">
                    {/* Hiển thị giá */}
                    <span>${tour.price != null ? tour.price.toFixed(2) : 'N/A'}</span>/person
                  </span>
                  <div className="ratting">
                    {/* Hiển thị rating (cần làm tròn và xử lý nếu null) */}
                     {Array.from({ length: Math.round(tour.rating || 0) }).map((_, index) => (
                        <i key={index} className="fas fa-star" />
                     ))}
                     {tour.rating > 0 && <span className="ms-1">({tour.rating.toFixed(1)})</span>}
                  </div>
                </div>
                {/* Link Explore */}
                <Link href={`/tour-details?id=${tour.id}`} className="theme-btn style-three">
                  <span data-hover="Explore">Explore</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          );
        })}
      {/* Bỏ các block loading/error/no data ở đây vì đã xử lý ở đầu component */}
    </div>
  );
};

export default FeaturesTours; // Giữ nguyên tên component FeaturesTours