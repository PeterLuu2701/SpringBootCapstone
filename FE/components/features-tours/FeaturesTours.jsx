'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link"; 

const FeaturesTours = () => {
  const [featuresTours, setfeaturesTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchfeaturesTours = async () => {
      try {
        const response = await fetch("http://localhost:8080/tour/get-all-tour");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        let actualData = await response.json();
        setfeaturesTours(actualData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setfeaturesTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchfeaturesTours();
  }, []);

  if (loading) {
    return <div>Loading features tours...</div>;
  }

  if (error) {
    return <div>Error loading features tours: {error}</div>;
  }

  return (
    <div className="row justify-content-center">
      {loading ? (
        <div>Loading features tours...</div>
      ) : error ? (
        <div>Error loading features tours: {error}</div>
      ) : featuresTours && featuresTours.length > 0 ? (
        featuresTours.map((tour) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={tour.id}>
            <div
              className="destination-item style-four no-border"
              data-aos="flip-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="image">
                <span className="badge">10% Off</span>
                <a href="#" className="heart">
                  <i className="fas fa-heart" />
                </a>
                <img src={`assets/images/destinations/${tour.image_url}`} alt="Tour" />
              </div>
              <div className="content">
                <span className="location">
                  <i className="fal fa-map-marker-alt" /> {tour.name}
                </span>
                <h6>
                  <Link href={`/tour-details/${tour.id}`}>
                    {tour.description}
                  </Link>
                </h6>
              </div>
              <div className="destination-footer">
                <span className="price">
                  <span>{tour.price}</span>/person
                </span>
                <div className="ratting">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>
              </div>
              <Link href={`/tour-details/${tour.id}`} className="theme-btn style-three">
                <span data-hover="Explore">Explore</span>
                <i className="fal fa-arrow-right" />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No featured tours available.</div>
      )}
    </div>
  );
};

export default FeaturesTours;