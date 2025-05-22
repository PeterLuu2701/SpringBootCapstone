"use client";
import { sliderProps } from "@/utility/sliderprops";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Định nghĩa URL gốc của backend
  const backendBaseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${backendBaseUrl}/destination`, { cache: 'no-store' });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error: ${response.status}, body: ${errorText}`
          );
        }
        let actualData = await response.json();
        console.log("API Response for Destination slider:", actualData);
        const destinationsData = actualData.data && Array.isArray(actualData.data.content) ? actualData.data.content : [];
        setDestinations(destinationsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching destinations for slider:", err);
        setError(err.message);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="text-center">Loading destinations...</div>; // Thêm class để căn giữa
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading destinations: {error}</div>; // Thêm class để căn giữa và màu đỏ
  }

  if (!Array.isArray(destinations) || destinations.length === 0) {
      return <div className="text-center">No destinations available.</div>; // Thêm class để căn giữa
  }


  return (
    <Slider {...sliderProps.destination} className="destination-active">
      {destinations.map((destination) => {
          // Tạo URL ảnh đầy đủ bằng cách ghép backendBaseUrl với imageUrl từ DTO
          const fullImageUrl = destination.imageUrl ? `${backendBaseUrl}${destination.imageUrl}` : null;

          return (
            // Mỗi item trong slider cần div bao bọc (như template gốc)
            <div key={destination.id}> {/* Không cần data-aos ở đây, Slickslider xử lý */}
              <div
                className="destination-item style-two" // Giữ nguyên class của template
                // data-aos="fade-up" // Bỏ data-aos ở đây, Slickslider xử lý animate item
                // data-aos-duration={1500}
                // data-aos-offset={50}
              >
                <div className="image"> {/* Container cho ảnh */}
                  {fullImageUrl ? (
                      <img
                        src={fullImageUrl}
                        alt={destination.name || "Destination Image"}
                        // Có thể thêm inline style nếu CSS template không đủ (nhưng nên sửa CSS)
                        // style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      />
                  ) : (
                      // Placeholder nếu không có ảnh, điều chỉnh kích thước cho phù hợp container
                       <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>No Image Available</div>
                  )}
                </div>
                <div className="content">
                  <h6>
                    <Link href={`/destination-details?id=${destination.id}`}>{destination.name}</Link>
                  </h6>
                  {destination.country && <span className="tours">{destination.country}</span>}
                  {destination.city && destination.country && <span className="tours">, {destination.city}</span>}
                  {!destination.country && destination.city && <span className="tours">{destination.city}</span>}
                </div>
              </div>
            </div>
          );
        })}
    </Slider>
  );
};
export default Destination;