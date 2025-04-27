import Link from "next/link";

const DestinationItem = ({
  imageUrl,
  title,
  toursCount,
<<<<<<< HEAD
  destinationDetailsLink,
=======
  destinationDetailsLink, // No default anymore, it will be passed dynamically
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a
  aosDelay = 0,
}) => {
  // Nếu imageUrl đã là đường dẫn đầy đủ, sử dụng trực tiếp; nếu không, nối với đường dẫn mặc định
  const finalImageUrl = imageUrl.startsWith("/")
    ? imageUrl
    : `/assets/images/destinations/${imageUrl}`;

  return (
<<<<<<< HEAD
    <div
      className="col"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div className="destination-item style-two">
        <div className="imageeeeee">
          <img src={finalImageUrl} alt={title} />
=======
    <div className="col" data-aos="fade-up" data-aos-delay={aosDelay} data-aos-duration={1500} data-aos-offset={50}>
      <div className="destination-item style-two">
        <div className="image">
          <img
            src={`/assets/images/destinations/${imageUrl}`} // Assuming your images are in this path
            alt={title}
          />
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a
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