"use client";

import Link from "next/link";

const TourByDestination = ({
  imageUrl,
  id,
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
  const backendBaseUrl = "http://localhost:8080";

  const fullImageUrl = imageUrl ? `${backendBaseUrl}${imageUrl}` : null;

  return (
    <div
      className="col"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div
        className="destination-item style-three bgc-lighter"
        style={{
          backgroundColor: "#ffffff", // Explicit white background for the tour item card
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: Add a subtle shadow
          borderRadius: "8px", // Optional: Add some border-radius
          overflow: "hidden", // Ensures border-radius applies to children
        }}
      >
        <div className="image">
          {/* Badges already have their own background colors via classes (bgc-pink, bgc-green, bgc-primary) */}
          {/* {featured && <span className="badge bgc-pink">Featured</span>}
          {discount && <span className="badge bgc-green">Discount</span>}
          {popular && <span className="badge bgc-primary">Popular</span>} */}
          <a href="#" className="heart" style={{ color: "#ff4d4d" }}>
            {" "}
            {/* Red heart icon */}
            <i className="fas fa-heart" />
          </a>
          {fullImageUrl && (
            <img src={fullImageUrl} alt={title || "Tour Image"} />
          )}
          {!fullImageUrl && (
            <div
              style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#666", // Grey text for "No Image"
                fontSize: "1.2em",
              }}
            >
              No Image
            </div>
          )}{" "}
          {/* Hiển thị placeholder nếu không có ảnh */}
        </div>
        <div className="content" style={{ padding: "20px" }}>
          {" "}
          {/* Add some padding inside the content area */}
          <div className="destination-header">
            <span className="location" style={{ color: "#555" }}>
              {" "}
              {/* Darker grey for location text */}
              <i
                className="fal fa-map-marker-alt"
                style={{ color: "#007bff" }}
              />{" "}
              {/* Blue map marker icon */} {location}
            </span>
            <div className="ratting">
              {Array.from({ length: Math.round(rating || 0) }).map(
                (_, index) => (
                  <i
                    key={index}
                    className="fas fa-star"
                    style={{ color: "#ffc107" }}
                  /> // Gold stars
                )
              )}
              {rating > 0 && (
                <span className="ms-1" style={{ color: "#777" }}>
                  ({rating.toFixed(1)})
                </span> // Lighter grey for rating number
              )}
            </div>
          </div>
          <h5>
            <Link href={`/tour-details/${id}`} style={{ color: "#333" }}>
              {title}
            </Link>{" "}
            {/* Darker text for title link */}
          </h5>
          <p style={{ color: "#666" }}>{description}</p>{" "}
          {/* Slightly lighter grey for description */}
          <ul className="blog-meta">
            <li style={{ color: "#777" }}>
              <i className="far fa-clock" style={{ color: "#007bff" }} />{" "}
              {/* Blue clock icon */} {duration}
            </li>
            {guests && (
              <li style={{ color: "#777" }}>
                <i className="far fa-user" style={{ color: "#007bff" }} />{" "}
                {/* Blue user icon */} {guests}
              </li>
            )}
          </ul>
          <div className="destination-footer">
            <span
              className="price"
              style={{ color: "#28a745", fontWeight: "bold" }}
            >
              {" "}
              {/* Green and bold for price */}
              <span>${price != null ? price.toFixed(2) : "N/A"}</span>/person
            </span>
            <Link
              href={`/tour-details/${id}`}
              className="theme-btn style-two style-three"
              style={{
                backgroundColor: "#FF5722", // Deep Orange background
                color: "#FFFFFF", // White text
                border: "none", // Remove border
                padding: "10px 20px", // Adjust padding
                borderRadius: "5px", // Slightly rounded corners
                textDecoration: "none", // Remove underline
                display: "inline-block", // Ensure it behaves like a button
                transition: "background-color 0.3s ease", // Smooth hover effect
              }}
            >
              <span data-hover="Book Now">Book Now</span>
              <i
                className="fal fa-arrow-right"
                style={{ marginLeft: "5px" }}
              />{" "}
              {/* Space for arrow */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourByDestination;
