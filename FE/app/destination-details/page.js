import SectionTitle from "@/components/SectionTitle";
import Destination from "@/components/slider/Destination";
import Subscribe from "@/components/Subscribe";
import TourItem from "@/components/tour-item/TourItem";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const page = () => {
  return (
    <ReveloLayout>
      {/* Page Banner Start */}
      <section className="page-banner-two rel z-1">
        <div className="container-fluid">
          <hr className="mt-0" />
          <div className="container">
            <div className="banner-inner pt-15 pb-25">
              <h2
                className="page-title mb-10"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                Bali, Indonesia
              </h2>
              <nav aria-label="breadcrumb">
                <ol
                  className="breadcrumb justify-content-center mb-20"
                  data-aos="fade-right"
                  data-aos-delay={200}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Destination Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* Page Banner End */}
      {/* Destination Gallery start */}
      <div className="destination-gallery">
        <div className="container-fluid">
          <div className="row gap-10 justify-content-center rel">
            <div className="col-lg-4 col-md-6">
              <div className="gallery-item">
                <img
                  src="assets/images/destinations/destination-details1.jpg"
                  alt="Destination"
                />
              </div>
              <div className="gallery-item">
                <img
                  src="assets/images/destinations/destination-details4.jpg"
                  alt="Destination"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="gallery-item">
                <img
                  src="assets/images/destinations/destination-details2.jpg"
                  alt="Destination"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="gallery-item">
                <img
                  src="assets/images/destinations/destination-details3.jpg"
                  alt="Destination"
                />
              </div>
              <div className="gallery-item">
                <img
                  src="assets/images/destinations/destination-details5.jpg"
                  alt="Destination"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="gallery-more-btn">
                <Link
                  href="contact"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="See All Photos">See All Photos</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Destination Gallery End */}
      {/* About Us Area start */}
      <section className="about-us-area pt-90 pb-100 rel z-1">
        <div className="container">
          <div className="row gap-100 align-items-center">
            <div className="col-lg-6">
              <div
                className="destination-details-content rmb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-25">
                  <span className="h2 mb-15">Welcome to </span>
                  <h2>Bali, Indonesia</h2>
                </div>
                <p>
                  Bali, Indonesia, is a tropical paradise renowned for
                  breathtaking beaches, vibrant culture, and lush landscapes.
                  Located at the westernmost end of the Lesser Sunda Islands,
                  Bali boasts a warm, tropical climate that is year-round
                  destination visitors are drawn to its picturesque beaches
                </p>
                <p>
                  The island's rich cultural heritage is evident in numerous
                  temples, including the iconic Tanah Lot and Uluwatu Temple, as
                  well as the cultural
                </p>
                <Link
                  href="destination-details"
                  className="theme-btn mt-25 style-two"
                >
                  <span data-hover="Explore Destinations">
                    Explore Destinations
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="destination-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d96777.16150026117!2d-74.00840582560909!3d40.71171357405996!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1706508986625!5m2!1sen!2sbd"
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Area end */}
      {/* Features Tours Area start */}
      <section className="features-tour-area bgc-black text-white pt-100 pb-50 rel z-1">
        <div className="container">
          <div className="row justify-content-between align-items-center pb-25">
            <div className="col-lg-6">
              <div
                className="section-title counter-text-wrap mb-20"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle title={"Discover Tours"} bg={"bgc-primary"} />
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <ul className="destinations-nav style-two mb-20">
                <li data-filter="*" className="active">
                  Show All
                </li>
                <li data-filter=".beach">Beach</li>
                <li data-filter=".museum">Museum</li>
                <li data-filter=".park">Park</li>
                <li data-filter=".city">City</li>
              </ul>
            </div>
          </div>
          <div className="row destinations-active justify-content-center">
            <div>
              <TourItem/>
            </div>
          </div>
        </div>
      </section>
      {/* Features Tours Area end */}
      {/* CTA Area start */}
      <section className="cta-area rel z-1 pt-100">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta1.jpg)" }}
              >
                <span className="category">Tent Camping</span>
                <h2>Explore the world best tourism</h2>
                <Link
                  href="tour-details"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta2.jpg)" }}
              >
                <span className="category">Sea Beach</span>
                <h2>World largest Sea Beach in Thailand</h2>
                <Link href="tour-details" className="theme-btn style-two">
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta3.jpg)" }}
              >
                <span className="category">Water Falls</span>
                <h2>Largest Water falls Bali, Indonesia</h2>
                <Link
                  href="tour-details"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Area end */}
      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};
export default page;
