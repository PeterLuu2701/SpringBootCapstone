"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DestinationItem from "@/components/destination-item/DestinationItem";
import ReactPaginate from "react-paginate";

const DestinationsList = ({ initialDestinations = [], itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    let isMounted = true;

    // If initialDestinations are provided (e.g., from SSR/SSG), use them
    if (initialDestinations.length > 0) {
      setDestinations(initialDestinations);
      setPageCount(Math.ceil(initialDestinations.length / itemsPerPage));
      return;
    }

    const fetchDestinations = async () => {
      if (!isMounted) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/destination`);
        const data = response.data?.data || [];
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: data is not an array");
        }
        if (isMounted) {
          setDestinations(data);
          setPageCount(Math.ceil(data.length / itemsPerPage));
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        if (isMounted) {
          setError("Failed to load destinations. Please try again later.");
          setDestinations([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDestinations();

    return () => {
      isMounted = false;
    };
  }, [API_URL, itemsPerPage, initialDestinations]);

  // Calculate the current page's destinations for client-side pagination
  const startIndex = currentPage * itemsPerPage;
  const currentDestinations = destinations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="destinations-page-area pt-95 pb-90 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div
              className="section-title text-center counter-text-wrap mb-50"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <h2>Explore Our Popular Destinations</h2>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="row gap-10 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="skeleton-card h-64 bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : currentDestinations.length > 0 ? (
          <div className="row gap-10 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 justify-content-center">
            {currentDestinations.map((destination, index) => (
              <DestinationItem
                key={destination.id}
                imageUrl={
                  destination.image_url
                    ? destination.image_url.split("/").pop()
                    : "default-image.jpg"
                }
                title={destination.name}
                toursCount={destination.toursCount || 10}
                destinationDetailsLink={`/destination-details?id=${destination.id}`}
                aosDelay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No destinations available.</p>
          </div>
        )}

        {pageCount > 1 && (
          <div className="row justify-content-center mt-40">
            <ReactPaginate
              nextLabel=" >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< "
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination flex justify-center space-x-2 mt-10"
              activeClassName="bg-blue-600 text-white"
              disabledClassName="disabled"
              ariaLabelBuilder={(page) => `Page ${page}`}
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationsList;
