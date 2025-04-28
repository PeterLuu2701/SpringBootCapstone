import Link from "next/link";

const DestinationItem = ({
  imageUrl,
  title,
  toursCount,
  destinationDetailsLink,
  aosDelay = 0,
}) => {
  // Nếu imageUrl đã là đường dẫn đầy đủ, sử dụng trực tiếp; nếu không, nối với đường dẫn mặc định
  const finalImageUrl = imageUrl.startsWith("/")
    ? imageUrl
    : `/assets/images/destinations/${imageUrl}`;

  return (
    <div className="col" data-aos="fade-up" data-aos-delay={aosDelay} data-aos-duration={1500} data-aos-offset={50}>
      <div className="destination-item style-two">
        <div className="image">
          <img
            src={`/assets/images/destinations/${imageUrl}`} 
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