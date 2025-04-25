import Link from "next/link";

const TourItem = ({
  imageUrl,
  badgeText, // You might not be using this directly anymore if you have featured/discount flags
  badgeClass, // Similarly, this might be dynamic based on discount type
  location,
  rating,
  title,
  description,
  duration,
  guests, // This prop might not always be available from your tour API
  price,
  tourDetailsLink = `/tour-details/${title?.toLowerCase().replace(/ /g, '-')}`, // Dynamic link based on title
  featured, // Boolean to indicate if the tour is featured
  discount, // Could be a percentage or a text like "10% Off"
  popular, // Boolean to indicate if the tour is popular
}) => {
  return (
    <div
      className="destination-item style-three bgc-lighter"
      data-aos="fade-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div className="image">
        {featured && <span className="badge bgc-pink">Featured</span>}
        {discount && <span className={`badge ${badgeClass || ''}`}>{discount}</span>} {/* Use discount value as text */}
        {popular && <span className="badge bgc-primary">Popular</span>}
        <a href="#" className="heart">
          <i className="fas fa-heart" />
        </a>
        <img
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="content">
        <div className="destination-header">
          <span className="location">
            <i className="fal fa-map-marker-alt" /> {location}
          </span>
          <div className="ratting">
            {Array.from({ length: Math.round(rating) }).map((_, index) => (
              <i key={index} className="fas fa-star" />
            ))}
            {/* Consider adding empty stars for visual consistency if needed */}
          </div>
        </div>
        <h5>
          <Link href={tourDetailsLink}>
            {title}
          </Link>
        </h5>
        <p>
          {description}
        </p>
        <ul className="blog-meta">
          <li>
            <i className="far fa-clock" /> {duration}
          </li>
          {guests && (
            <li>
              <i className="far fa-user" /> {guests}
            </li>
          )}
          {/* You can add more meta information here if your API provides it */}
        </ul>
        <div className="destination-footer">
          <span className="price">
            <span>${price?.toFixed(2)}</span>/person
          </span>
          <Link
            href={tourDetailsLink}
            className="theme-btn style-two style-three"
          >
            <span data-hover="Book Now">Book Now</span>
            <i className="fal fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourItem;