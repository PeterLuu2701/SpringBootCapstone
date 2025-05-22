"use client";
import AddCommentForm from "@/components/add-comment-form/AddCommentForm";
import ClientsComments from "@/components/clients-comments/ClientsComments";
import RaveloAccordion from "@/components/RaveloAccordion";
import Subscribe from "@/components/Subscribe";
import TourBookingForm from "@/components/tour-booking-form/TourBookingForm";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const page = () => {
  const faqItem = [
    {
      id: 1,
      title: "1. What services does your tour and travel agency offer?",
    },
    {
      id: 2,
      title: " 2. How do I book a tour or travel package?",
    },
    {
      id: 3,
      title: " 3. What types of tours do you offer?",
    },
    {
      id: 4,
      title: " 4. Can I customize my travel package?",
    },
    {
      id: 5,
      title: " 5. Are your tours suitable for families with children?",
    },
  ];
  const [active, setActive] = useState("collapse0");

  const faqItem2 = [
    {
      id: 1,
      title: "01_What services does your tour and travel agency offer?",
    },
    {
      id: 2,
      title: " 02_How do I book a tour or travel package?",
    },
    {
      id: 3,
      title: " 03_What types of tours do you offer?",
    },
    {
      id: 4,
      title: " 04_Can I customize my travel package?",
    },
    {
      id: 5,
      title: " 05_Are your tours suitable for families with children?",
    },
  ];
  const [active2, setActive2] = useState("collapse0");
  return (
    <ReveloLayout>
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
                  <li className="breadcrumb-item active">Tour Details</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* Page Banner End */}
      {/* Tour Gallery start */}
      <div className="tour-gallery">
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
          </div>
        </div>
      </div>
      {/* Tour Gallery End */}
      {/* Tour Header Area start */}
      <section className="tour-header-area pt-70 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 col-lg-7">
              <div
                className="tour-header-content mb-15"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="location d-inline-block mb-10">
                  <i className="fal fa-map-marker-alt" /> Bali, Indonesia
                </span>
                <div className="section-title pb-5">
                  <h2>
                    Relinking Beach in Nusa panada island, Bali, Indonesia
                  </h2>
                </div>
                <div className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-5 text-lg-end"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="tour-header-social mb-10">
                <a href="#">
                  <i className="far fa-share-alt" />
                  Share tours
                </a>
                <a href="#">
                  <i className="fas fa-heart bgc-secondary" />
                  Wish list
                </a>
              </div>
            </div>
          </div>
          <hr className="mt-50 mb-70" />
        </div>
      </section>
      {/* Tour Header Area end */}
      {/* Tour Details Area start */}
      <section className="tour-details-page pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour-details-content">
                <h3>Explore Tours</h3>
                <p>
                  Bali, Indonesia, is a tropical paradise renowned for its
                  breathtaking beaches, vibrant culture, and lush landscapes.
                  Located at the westernmost end of the Lesser Sunda Islands,
                  Bali boasts a warm, tropical climate that makes it a
                  year-round destination. Visitors are drawn to its picturesque
                  beaches like Kuta, Seminyak, and Nusa Dua, ideal for surfing,
                  sunbathing, and diving. The island's rich cultural heritage is
                  evident in its numerous temples, including the iconic Tanah
                  Lot and Uluwatu Temple, as well as in Ubud, the cultural heart
                  of Bali, known for its traditional dance performances and art
                  markets. Nature enthusiasts can explore the terraced rice
                  paddies in Tegallalang, hike up Mount Batur, or visit the
                  stunning waterfalls of Tegenungan and Gitgit.{" "}
                </p>
                <div className="row pb-55">
                  <div className="col-md-6">
                    <div className="tour-include-exclude mt-30">
                      <h5>Included and Excluded</h5>
                      <ul className="list-style-one check mt-25">
                        <li>
                          <i className="far fa-check" /> Pick and Drop Services
                        </li>
                        <li>
                          <i className="far fa-check" /> 1 Meal Per Day
                        </li>
                        <li>
                          <i className="far fa-check" /> Cruise Dinner &amp;
                          Music Event
                        </li>
                        <li>
                          <i className="far fa-check" /> Visit 7 Best Places in
                          the City
                        </li>
                        <li>
                          <i className="far fa-check" /> Bottled Water on Buses
                        </li>
                        <li>
                          <i className="far fa-check" /> Transportation Luxury
                          Tour Bus
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tour-include-exclude mt-30">
                      <h5>Excluded</h5>
                      <ul className="list-style-one mt-25">
                        <li>
                          <i className="far fa-times" /> Gratuities
                        </li>
                        <li>
                          <i className="far fa-times" /> Hotel pickup and
                          drop-off
                        </li>
                        <li>
                          <i className="far fa-times" /> Lunch, Food &amp;
                          Drinks
                        </li>
                        <li>
                          <i className="far fa-times" /> Optional upgrade to a
                          glass
                        </li>
                        <li>
                          <i className="far fa-times" /> Additional Services
                        </li>
                        <li>
                          <i className="far fa-times" /> Insurance
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Activities</h3>
              <div className="tour-activities mt-30 mb-45">
                <div className="tour-activity-item">
                  <i className="flaticon-hiking" />
                  <b>Hiking</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-fishing" />
                  <b>Fishing</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-man" />
                  <b>Kayak shooting</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-kayak-1" />
                  <b>Kayak</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-bonfire" />
                  <b>Campfire</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-flashlight" />
                  <b>Night Exploring</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-cycling" />
                  <b>Biking</b>
                </div>
                <div className="tour-activity-item">
                  <i className="flaticon-meditation" />
                  <b>Yoga</b>
                </div>
              </div>
              <h3>Itinerary</h3>
              <Accordion
                className="accordion-two mt-25 mb-60"
                defaultActiveKey={active}
              >
                {faqItem.map((data, i) => (
                  <RaveloAccordion
                    title={data.title}
                    key={data.id}
                    event={`collapse${i}`}
                    onClick={() =>
                      setActive(active == `collapse${i}` ? "" : `collapse${i}`)
                    }
                    active={active}
                  />
                ))}
              </Accordion>
              <h3>Frequently Asked Questions</h3>
              <Accordion
                className="accordion-one mt-25 mb-60"
                defaultActiveKey={active2}
              >
                {faqItem2.map((data, i) => (
                  <RaveloAccordion
                    title={data.title}
                    key={data.id}
                    event={`collapse${i}`}
                    onClick={() =>
                      setActive(active2 == `collapse${i}` ? "" : `collapse${i}`)
                    }
                    active={active2}
                  />
                ))}
              </Accordion>
              <h3>Maps</h3>
              <div className="tour-map mt-30 mb-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d96777.16150026117!2d-74.00840582560909!3d40.71171357405996!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1706508986625!5m2!1sen!2sbd"
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <h3>Clients Reviews</h3>
              <div className="clients-reviews bgc-black mt-30 mb-60">
                <div className="left">
                  <b>4.8</b>
                  <span>(586 reviews)</span>
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                  </div>
                </div>
                <div className="right">
                  <div className="ratting-item">
                    <span className="title">Services</span>
                    <span className="line">
                      <span style={{ width: "80%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                  <div className="ratting-item">
                    <span className="title">Guides</span>
                    <span className="line">
                      <span style={{ width: "70%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                  <div className="ratting-item">
                    <span className="title">Price</span>
                    <span className="line">
                      <span style={{ width: "80%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                  <div className="ratting-item">
                    <span className="title">Safety</span>
                    <span className="line">
                      <span style={{ width: "80%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                  <div className="ratting-item">
                    <span className="title">Foods</span>
                    <span className="line">
                      <span style={{ width: "80%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                  <div className="ratting-item">
                    <span className="title">Hotels</span>
                    <span className="line">
                      <span style={{ width: "80%" }} />
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
              <h3>Clients Comments</h3>
              <ClientsComments />
              <h3>Add Reviews</h3>
              <AddCommentForm />
            </div>
            <div className="col-lg-4 col-md-8 col-sm-10 rmt-75">
              <div className="blog-sidebar tour-sidebar">
                <TourBookingForm/>
                <div
                  className="widget widget-contact"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h5 className="widget-title">Need Help?</h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="far fa-envelope" />{" "}
                      <a href="emilto:helpxample@gmail.com">
                        helpxample@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="far fa-phone-volume" />{" "}
                      <a href="callto:+000(123)45688">+000 (123) 456 88</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Details Area end */}
      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};
export default page;
