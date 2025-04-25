'use client'

import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import TourItem from "@/components/tour-item/TourItem";
import TourSidebar from "@/components/TourSidebar";
import ReveloLayout from "@/layout/ReveloLayout";
import { useEffect, useState } from "react";

const TourListPage = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:8080/destination');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const destinationsMap = {};
      data.data.forEach((dest) => {
        destinationsMap[dest.id] = dest.name;
      });
      return destinationsMap;
    } catch (error) {
      console.error("Error fetching destinations:", error.message);
      return {}; // fallback to empty destinations
    }
  };

  useEffect(() => {
    const loadData = async () => {
      let fetchedTours = [];
      let fetchedDestinations = {};

      try {
        const toursResponse = await fetch('http://localhost:8080/tour/getall');
        if (toursResponse.ok) {
          const toursData = await toursResponse.json();
          fetchedTours = toursData?.data || [];
        } else {
          console.warn("Could not fetch tours: HTTP status", toursResponse.status);
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err.message);
      }

      fetchedDestinations = await fetchDestinations();

      setTours(fetchedTours);
      setDestinations(fetchedDestinations);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading tours and destinations...</div>;
  }

  return (
    <ReveloLayout>
      <Banner pageTitle={"Tour List View"} pageName={"Tour List"} search />

      {/* Tour List Area start */}
      <section className="tour-list-page py-100 rel z-1">
        <div className="container">
          <div className="row">
            <TourSidebar />
            <div className="col-lg-9">
              <div className="shop-shorter rel z-3 mb-20">
                <ul className="grid-list mb-15 me-2">
                  <li>
                    <a href="#"><i className="fal fa-border-all" /></a>
                  </li>
                  <li>
                    <a href="#"><i className="far fa-list" /></a>
                  </li>
                </ul>
                <div className="sort-text mb-15 me-4 me-xl-auto">
                  {tours.length} Tours found
                </div>
                <div className="sort-text mb-15 me-4">Sort By</div>
                <select>
                  <option value="default" selected="">Short By</option>
                  <option value="new">Newness</option>
                  <option value="old">Oldest</option>
                  <option value="hight-to-low">High To Low</option>
                  <option value="low-to-high">Low To High</option>
                </select>
              </div>

              {tours.length === 0 ? (
                <div className="alert alert-warning">No tours available at the moment. Please try again later.</div>
              ) : (
                tours.map((tour) => (
                  <TourItem
                    key={tour.id}
                    title={tour.name}
                    description={tour.description}
                    price={tour.price}
                    rating={tour.rating}
                    imageUrl={tour.image_url}
                    duration={tour.duration}
                    location={destinations[tour.destination_id] || 'Unknown Destination'} 
                    featured={tour.is_feature === "1"} 
                  />
                ))
              )}

              <ul className="pagination pt-15 flex-wrap" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                <li className="page-item disabled">
                  <span className="page-link"><i className="far fa-chevron-left" /></span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1<span className="sr-only">(current)</span></span>
                </li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#"><i className="far fa-chevron-right" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Tour List Area end */}

      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};

export default TourListPage;
