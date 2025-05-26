"use client";
import { sliderProps } from "@/utility/sliderprops";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8080/destination");
        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }
        let actualData = await response.json();
        setDestinations(actualData.data.content);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div>Loading destinations...</div>;
  }

  if (error) {
    return <div>Error loading destinations: {error}</div>;
  }

  return (
    <Slider {...sliderProps.destination} className="destination-active">
      {destinations.map((destination) => (
        <div
          className="destination-item style-two"
          key={destination.id}
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src={`assets/images/destinations/${destination.image_url}`}
              alt={destination.name}
            />
          </div>
          <div className="content">
            <h6>
              <Link href={`/destinations/${destination.id}`}>{destination.name}</Link>
            </h6>
            {/* You might want to display something else here, like the country or duration */}
            <span className="tours">{destination.country}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default Destination;
