"use client";

import Link from "next/link";
import slugify from "slugify";

const TourItem = ({
  imageUrl,
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
          {discount && <span className="badge bgc-green">{discount}</span>}
          {popular && <span className="badge bgc-primary">Popular</span>}
          <a href="#" className="heart">
            <i className="fas fa-heart" />
          </a>
          <img src={imageUrl} alt={title} />
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
              <span>${price?.toFixed(2)}</span>/person
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
