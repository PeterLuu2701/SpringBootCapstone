"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/layout/AdminLayout";
import Image from "next/image";
import axios from "axios";

const DestinationDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { dId } = params || {};

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dId) return;

    const fetchDestination = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/destination/${dId}`
        );
        const result = response.data;

        if (result.statusCode === 200 && result.data) {
          setDestination(result.data);
        } else {
          setError("Failed to load destination data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [dId]);

  const handleBack = () => {
    router.push("/admin/destination-details");
  };

  const handleBookTour = () => {
    router.push("/book-tour"); // Adjust the route as needed
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5 text-white">Loading...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-5 text-danger">{error}</div>
        <button
          onClick={handleBack}
          className="btn btn-warning mt-3 text-white"
        >
          Go Back
        </button>
      </AdminLayout>
    );
  }

  if (!destination) {
    return (
      <AdminLayout>
        <div className="text-center py-5 text-white">No destination found</div>
        <button
          onClick={handleBack}
          className="btn btn-warning mt-3 text-white"
        >
          Go Back
        </button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="">
        {/* Main Section */}
        <div
          className="d-flex align-items-center justify-content-center  "
          style={{ marginTop: "50px" }}
        >
          <div className="container py-5">
            <div className="row align-items-center">
              {/* Text Section */}
              <div className="col-md-6 text-start">
                <p className="text-warning mb-4 fs-5">
                  Trải nghiệm kỳ quan thiên nhiên thế giới với chuyến du ngoạn{" "}
                  {destination.name} .
                </p>
                <h3
                  className="text-black text-uppercase fw-bold mb-4"
                  style={{ fontSize: "2.5rem" }}
                >
                  Hành trình khám phá {destination.name}
                </h3>
                <div className="text-black mb-3">
                  <span className="me-3">
                    <strong>Country:</strong> {destination.country}
                  </span>
                  <span>
                    <strong>City:</strong> {destination.city}
                  </span>
                </div>
                <div className="text-black mb-4">
                  <strong>Duration:</strong> {destination.duration}
                </div>
              </div>

              {/* Image Section */}
              <div className="col-md-6">
                <Image
                  src={destination.image_url}
                  alt={destination.name}
                  width={600}
                  height={400}
                  className="img-fluid rounded-4 w-100"
                  style={{
                    height: "300px",
                    objectFit: "cover",

                    borderRadius: "7px",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="container   " style={{ marginTop: "100px" }}>
          <h3 className="text-black text-center mb-4">
            Bản đồ {destination.name}
          </h3>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <iframe
                src={destination.google_map_url}
                // src={
                //   "https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d61349.62160610526!2d108.1654205708296!3d16.047247286526623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d16.04897948949957!2d108.2025852580837!5e0!3m2!1svi!2s!4v1745413996312!5m2!1svi!2s"
                // }
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-4"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DestinationDetail;
