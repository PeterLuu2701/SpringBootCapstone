import Link from "next/link";

const DestinationItem = ({
  imageUrl,
  title,
  toursCount,
  destinationDetailsLink = "destination-details", // Default link
  aosDelay = 0, // Default AOS delay
}) => {
  return (
    <>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five1.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Switzerland's</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five2.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Poland</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={100}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five3.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Indonesia</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={100}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five4.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Thailand</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five5.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Rome, Italy</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five6.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">New York</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five7.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Poland</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five8.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Wroclaw, Poland</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five9.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">France, Paris</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-delay={150}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five10.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="destination-details">Antalya, Turkey</Link>
            </h6>
            <span className="tours">258 tours</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationItem;
