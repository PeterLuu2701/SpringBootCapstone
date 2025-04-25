import Link from "next/link";

const DestinationItem = ({
  imageUrl,
  title,
  toursCount,
  destinationDetailsLink,
  aosDelay = 0,
}) => {
  return (
    <div className="col" data-aos="fade-up" data-aos-delay={aosDelay} data-aos-duration={1500} data-aos-offset={50}>
      <div className="destination-item style-two">
        <div className="image">
          <img
            src={`/assets/images/destinations/${imageUrl}`} // Assuming your images are in this path
            alt={title}
          />
        </div>
        <div className="content">
          <h6>
            <Link href={destinationDetailsLink}>{title}</Link>
          </h6>
          <span className="tours">{toursCount} tours</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationItem;