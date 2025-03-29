import Link from "next/link";

const BookedTourItem = () => {
  return (
    <div className="destination-item style-three bgc-lighter" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
      <div className="image">
        <span className="badge bgc-green">Booked</span>
        <img src="/assets/images/destinations/destination1.jpg" alt="Booked Tour" />
      </div>
      <div className="content">
        <div className="destination-header">
          <span className="location">
            <i className="fal fa-map-marker-alt" /> Paris, France
          </span>
          <div className="ratting">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
        <h5>
          <Link href="/tour-details">Romantic Getaway in Paris</Link>
        </h5>
        <p>Enjoy a luxurious romantic trip exploring the heart of France.</p>
        <ul className="blog-meta">
          <li>
            <i className="far fa-clock" /> 5 days 4 nights
          </li>
          <li>
            <i className="far fa-user" /> 2 guests
          </li>
        </ul>
        <div className="destination-footer">
          <span className="price">
            <span>$250.00</span>/person
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookedTourItem;
