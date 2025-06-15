"use client";

import AddCommentForm from "@/components/add-comment-form/AddCommentForm";
import ClientsComments from "@/components/clients-comments/ClientsComments";
import RaveloAccordion from "@/components/RaveloAccordion";
import Subscribe from "@/components/Subscribe";
import TourBookingForm from "@/components/tour-booking-form/TourBookingForm";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";

const TourDetailPage = ({ params }) => {
  const tourId = params.id;

  const [tourDetail, setTourDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [active, setActive] = useState("collapse0");
  const [active2, setActive2] = useState("collapse0");

  const backendBaseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchTourDetail = async () => {
      if (!tourId) {
        setLoading(false);
        setError("Tour ID is missing from the URL.");
        return;
      }
      try {
        const response = await fetch(
          `${backendBaseUrl}/tour/get-tour-by-id?id=${tourId}`,
          { cache: "no-store" }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${errorText}`
          );
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message || "Failed to fetch tour details.");
        }
        console.log("Fetched Tour Detail:", data.data);
        setTourDetail(data.data);
      } catch (err) {
        console.error("Error fetching tour detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [tourId]);

  const faqItem = [
    {
      id: 1,
      title: "1. What services does your tour and travel agency offer?",
      content:
        "We offer a wide range of tour and travel services, including custom tour packages, guided tours, flight and hotel bookings, and travel insurance.",
    },
    {
      id: 2,
      title: "2. How do I book a tour or travel package?",
      content:
        "You can book directly through our website, by calling our customer service, or by visiting one of our local offices.",
    },
    {
      id: 3,
      title: "3. What types of tours do you offer?",
      content:
        "We offer adventure tours, cultural tours, beach getaways, eco-tourism, and customized private tours.",
    },
    {
      id: 4,
      title: "4. Can I customize my travel package?",
      content:
        "Yes, absolutely! We specialize in creating tailor-made travel experiences to suit your preferences.",
    },
    {
      id: 5,
      title: "5. Are your tours suitable for families with children?",
      content:
        "Many of our tours are family-friendly, offering activities and accommodations suitable for all ages. Please check individual tour details or contact us for recommendations.",
    },
  ];

  const faqItem2 = [
    {
      id: 1,
      title: "01_What services does your tour and travel agency offer?",
      content: "Details for FAQ 2, item 1.",
    },
    {
      id: 2,
      title: "02_How do I book a tour or travel package?",
      content: "Details for FAQ 2, item 2.",
    },
    {
      id: 3,
      title: "03_What types of tours do you offer?",
      content: "Details for FAQ 2, item 3.",
    },
    {
      id: 4,
      title: "04_Can I customize my travel package?",
      content: "Details for FAQ 2, item 4.",
    },
    {
      id: 5,
      title: "05_Are your tours suitable for families with children?",
      content: "Details for FAQ 2, item 5.",
    },
  ];

  if (loading) {
    return (
      <ReveloLayout>
        <section className="tour-details-page py-100 rel z-1">
          <div className="container">
            <div className="alert alert-info">Loading tour details...</div>
          </div>
        </section>
      </ReveloLayout>
    );
  }

  if (error) {
    return (
      <ReveloLayout>
        <section className="tour-details-page py-100 rel z-1">
          <div className="container">
            <div className="alert alert-danger">Error: {error}</div>
          </div>
        </section>
      </ReveloLayout>
    );
  }

  if (!tourDetail) {
    return (
      <ReveloLayout>
        <section className="tour-details-page py-100 rel z-1">
          <div className="container">
            <div className="alert alert-warning">Tour not found.</div>
          </div>
        </section>
      </ReveloLayout>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star" />);
    }
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt" />);
    }
    return stars;
  };

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
                {tourDetail.name}
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

      {/* Tour Gallery start - Dynamically display images */}
      {/* <div className="tour-gallery">
        <div className="container-fluid">
          <div className="row gap-10 justify-content-center rel">
            {tourDetail.image_url ? (
              <div className="col-lg-12">
                <div className="gallery-item">
                  <img
                    src={`${backendBaseUrl}/${tourDetail.image_url}`}
                    alt={tourDetail.name || "Tour Image"}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ) : (
              <div className="col-lg-12">
                <div className="gallery-item">
                  <div style={{ width: '100%', height: '400px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5em', color: '#666' }}>
                    No Image Available
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}
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
                  <i className="fal fa-map-marker-alt" />{" "}
                  {tourDetail.destinationName}, {tourDetail.destinationCountry}
                </span>
                <div className="section-title pb-5">
                  <h2>{tourDetail.name}</h2>
                </div>
                <div className="ratting">
                  {renderStars(tourDetail.rating)}
                  {tourDetail.rating > 0 && (
                    <span className="ms-1">
                      ({tourDetail.rating.toFixed(1)})
                    </span>
                  )}
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
                <p>{tourDetail.description}</p>
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
                          <i className="far fa-check" /> Cruise Dinner & Music
                          Event
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
                          <i className="far fa-times" /> Lunch, Food & Drinks
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
                {tourDetail.activityName && (
                  <div className="tour-activity-item">
                    <i className="flaticon-hiking" />{" "}
                    <b>{tourDetail.activityName}</b>
                  </div>
                )}
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
                      setActive(active === `collapse${i}` ? "" : `collapse${i}`)
                    }
                    active={active}
                  >
                    {data.content}
                  </RaveloAccordion>
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
                      setActive2(
                        active2 === `collapse${i}` ? "" : `collapse${i}`
                      )
                    }
                    active={active2}
                  >
                    {data.content}
                  </RaveloAccordion>
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
                  <b>
                    {tourDetail.rating ? tourDetail.rating.toFixed(1) : "N/A"}
                  </b>
                  <span>({/* count of reviews here from BE */} reviews)</span>
                  <div className="ratting">
                    {renderStars(tourDetail.rating)}
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
                <TourBookingForm
                  price={tourDetail.price}
                  duration={tourDetail.duration}
                />
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
                      <a href="mailto:helpxample@gmail.com">
                        helpxample@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="far fa-phone-volume" />{" "}
                      <a href="tel:+000(123)45688">+000 (123) 456 88</a>
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

export default TourDetailPage;
