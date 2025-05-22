"use client";

import Link from "next/link";

const DestinationItem = ({
  imageUrl, // Nhận URL tương đối từ backend (ví dụ: /file/ten_file.png)
  title,
  toursCount,
  destinationDetailsLink,
  aosDelay = 0,
}) => {
  const backendBaseUrl = "http://localhost:8080"; 
  const fullImageUrl = imageUrl ? `${backendBaseUrl}${imageUrl}` : null; // Trả về null nếu imageUrl gốc là null/undefined/empty

  return (
    <div className="col" data-aos="fade-up" data-aos-delay={aosDelay} data-aos-duration={1500} data-aos-offset={50}>
      <div className="destination-item style-two">
        <div className="image">
           {/* Sử dụng fullImageUrl đã ghép */}
           {fullImageUrl ? (
                <img src={fullImageUrl} alt={title || "Destination Image"} />
            ) : (
                // Placeholder nếu không có ảnh
                <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>No Image Available</div>
            )}
        </div>
        <div className="content">
          <h6>
            <Link href={destinationDetailsLink}>{title}</Link>
          </h6>
          {/* Kiểm tra toursCount có phải là số không trước khi hiển thị */}
          {toursCount != null && !isNaN(toursCount) && (
             <span className="tours">{toursCount} tours</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationItem;