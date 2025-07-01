"use client";
import Link from "next/link";
import Slider from "rc-slider";
import { useEffect, useState } from "react";

const TourSidebar = () => {
  const [activities, setActivities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState([10, 30]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch Activities
        const activitiesResponse = await fetch('http://localhost:8080/activity/get-all-activities', { cache: 'no-store' });
        if (!activitiesResponse.ok) {
          const errorText = await activitiesResponse.text();
          throw new Error(`HTTP error fetching activities! status: ${activitiesResponse.status}, body: ${errorText}`);
        }
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.data);

        // Fetch Tours
        const toursResponse = await fetch('http://localhost:8080/tour', { cache: 'no-store' });
        if (!toursResponse.ok) {
          const errorText = await toursResponse.text();
          throw new Error(`HTTP error fetching tours! status: ${toursResponse.status}, body: ${errorText}`);
        }
        const toursData = await toursResponse.json();
        const uniqueActivities = [
          ...new Set(toursData.data.map((tour) => tour.activityName)),
        ].filter(Boolean);
        setCountries(uniqueActivities);

      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  return (
    <div className="col-lg-3 col-md-6 col-sm-10 rmb-75">
      <div className="shop-sidebar mb-30">
        <div
          className="widget widget-filter"
          data-aos="fade-up"
          data-aos-delay={50}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h6 className="widget-title">Filter by Price</h6>
          <div className="price-filter-wrap">
            <div className="price-slider-range">
              <Slider
                value={value}
                range
                onChange={(e) => setValue(e)}
                trackStyle={{ backgroundColor: "#63AB45" }}
                handleStyle={{
                  borderColor: "#63AB45",
                  backgroundColor: "#63AB45",
                }}
                railStyle={{ backgroundColor: "rgba(99, 171, 69,0.2)" }}
              />
            </div>
            <div className="price">
              <span>Price </span>
              {/* <input type="text" value={value[0]} id="price" readOnly="" /> */}
              <p className="mb-0 fw-bold">
                ${value[0]} - ${value[1]}
              </p>
            </div>
          </div>
        </div>
        <div
          className="widget widget-activity"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h6 className="widget-title">By Activities</h6>
          <ul className="radio-filter">
            {activities.map((activity) => (
              <li key={activity.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="ByActivities"
                  id={`activity-${activity.id}`}
                />
                <label htmlFor={`activity-${activity.id}`}>
                  {activity.name} <span>{activities.length}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="widget widget-reviews"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h6 className="widget-title">By Reviews</h6>
          <ul className="radio-filter">
            <li>
              <input
                className="form-check-input"
                type="radio"
                defaultChecked=""
                name="ByReviews"
                id="review1"
              />
              <label htmlFor="review1">
                <span className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </span>
              </label>
            </li>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="ByReviews"
                id="review2"
              />
              <label htmlFor="review2">
                <span className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt white" />
                </span>
              </label>
            </li>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="ByReviews"
                id="review3"
              />
              <label htmlFor="review3">
                <span className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star-half-alt white" />
                </span>
              </label>
            </li>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="ByReviews"
                id="review4"
              />
              <label htmlFor="review4">
                <span className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star-half-alt white" />
                </span>
              </label>
            </li>
            <li>
              <input
                className="form-check-input"
                type="radio"
                name="ByReviews"
                id="review5"
              />
              <label htmlFor="review5">
                <span className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star white" />
                  <i className="fas fa-star-half-alt white" />
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div
          className="widget widget-languages"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h6 className="widget-title">By Country</h6>
          <ul className="radio-filter">
            {countries.map((country, index) => (
              <li key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="ByLanguages"
                  id={`country-${country?.replace(/\s+/g, "-").toLowerCase()}`}
                />
                <label
                  htmlFor={`country-${country
                    ?.replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {country}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="widget widget-tour"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h6 className="widget-title">Popular Tours</h6>
          <div className="destination-item tour-grid style-three bgc-lighter">
            <div className="image">
              <span className="badge">10% Off</span>
              <img src="assets/images/widgets/tour1.jpg" alt="Tour" />
            </div>
            <div className="content">
              <div className="destination-header">
                <span className="location">
                  <i className="fal fa-map-marker-alt" /> Bali, Indonesia
                </span>
                <div className="ratting">
                  <i className="fas fa-star" />
                  <span>(4.8)</span>
                </div>
              </div>
              <h6>
                <Link href="tour-details">
                  Relinking Beach, Bali, Indonesia
                </Link>
              </h6>
            </div>
          </div>
          <div className="destination-item tour-grid style-three bgc-lighter">
            <div className="image">
              <img src="assets/images/widgets/tour1.jpg" alt="Tour" />
            </div>
            <div className="content">
              <div className="destination-header">
                <span className="location">
                  <i className="fal fa-map-marker-alt" /> Bali, Indonesia
                </span>
                <div className="ratting">
                  <i className="fas fa-star" />
                  <span>(4.8)</span>
                </div>
              </div>
              <h6>
                <Link href="tour-details">
                  Relinking Beach, Bali, Indonesia
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div
        className="widget widget-cta"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="content text-white">
          <span className="h6">Explore The World</span>
          <h3>Best Tourist Place</h3>
          <Link href="tour-grid" className="theme-btn style-two bgc-secondary">
            <span data-hover="Explore Now">Explore Now</span>
            <i className="fal fa-arrow-right" />
          </Link>
        </div>
        <div className="image">
          <img src="assets/images/widgets/cta-widget.png" alt="CTA" />
        </div>
        <div className="cta-shape">
          <img src="assets/images/widgets/cta-shape2.png" alt="Shape" />
        </div>
      </div>
    </div>
  );
};
export default TourSidebar;
