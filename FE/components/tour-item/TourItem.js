"use client";

import Link from "next/link";
import slugify from "slugify";

const TourItem = ({
  imageUrl, // Nhận URL tương đối từ backend (ví dụ: /file/ten_file.png)
  location,
  rating = 0,
  title,
  description,
  duration,
  guests,
  price,
  featured,
  discount,
  popular,
  aosDelay = 0,
}) => {
  const slug = slugify(title || "", { lower: true, strict: true });

  const backendBaseUrl = "http://localhost:8080"; // URL gốc của backend
  
  const fullImageUrl = imageUrl ? `${backendBaseUrl}${imageUrl}` : null; 

  return (
    <div
      className="col"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div className="destination-item style-three bgc-lighter">
        <div className="image">
          {featured && <span className="badge bgc-pink">Featured</span>}
          {discount && <span className="badge bgc-green">Discount</span>} 
          {popular && <span className="badge bgc-primary">Popular</span>}
          <a href="#" className="heart">
            <i className="fas fa-heart" />
          </a>
          {/* Sử dụng fullImageUrl đã ghép */}
          {fullImageUrl && <img src={fullImageUrl} alt={title || "Tour Image"} />} 
          {!fullImageUrl && <div style={{ width: '100%', height: '200px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Image</div>} {/* Hiển thị placeholder nếu không có ảnh */}
        </div>
        <div className="content">
          <div className="destination-header">
            <span className="location">
              <i className="fal fa-map-marker-alt" /> {location}
            </span>
            <div className="ratting">
              {/* Đảm bảo rating là số trước khi làm tròn */}
              {Array.from({ length: Math.round(rating || 0) }).map((_, index) => (
                <i key={index} className="fas fa-star" />
              ))}
               {/* Hiển thị rating số nếu cần */}
               {rating > 0 && <span className="ms-1">({rating.toFixed(1)})</span>}
            </div>
          </div>
          <h5>
            <Link href={`/tour-details/${slug}`}>{title}</Link>
          </h5>
          <p>{description}</p>
          <ul className="blog-meta">
            <li>
              <i className="far fa-clock" /> {duration}
            </li>
            {guests && (
              <li>
                <i className="far fa-user" /> {guests}
              </li>
            )}
          </ul>
          <div className="destination-footer">
            <span className="price">
              {/* Đảm bảo price là số trước khi toFixed */}
              <span>${price != null ? price.toFixed(2) : 'N/A'}</span>/person
            </span>
            <Link
              href={`/tour-details/${slug}`}
              className="theme-btn style-two style-three"
            >
              <span data-hover="Book Now">Book Now</span>
              <i className="fal fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;