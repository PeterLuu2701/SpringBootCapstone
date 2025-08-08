"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Shield,
  Lock,
  Check,
  ArrowLeft,
  Star,
  Zap,
  Crown,
  Gift,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Calendar,
  Users,
  Camera,
  Utensils,
  Car,
  Bed,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const Checkout = () => {
  const searchParams = useSearchParams();
  const selectedTour = searchParams.get("tour") || "danang3days";
  const numberOfPeople = parseInt(searchParams.get("people")) || 2;
  const tourDate = searchParams.get("date") || "2025-07-15";
  const priceFromUrl = searchParams.get("price")
    ? parseInt(searchParams.get("price"))
    : null;
  const router = useRouter();

  // Fix the useState syntax
  const [parsedPrice, setParsedPrice] = useState(priceFromUrl || null);

  // Use price from useSearchParams instead of router.query
  useEffect(() => {
    if (priceFromUrl !== null) {
      setParsedPrice(priceFromUrl);
    }
  }, [priceFromUrl]);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    specialRequests: "",
  });

  const tourDetails = {
    danang3days: {
      name: "Da Nang 3 Days 2 Nights",
      icon: <Camera className="w-6 h-6" />,
      price: 1290000, // USD equivalent
      originalPrice: 1790000,
      period: "/person",
      color: "primary",
      duration: "3 days 2 nights",
      destination: "Da Nang - Hoi An",
      features: [
        "4-star hotel in city center",
        "Airport transfer included",
        "English-speaking tour guide",
        "Ba Na Hills excursion",
        "Hoi An Ancient Town tour",
        "Daily breakfast buffet",
        "Travel insurance included",
      ],
    },
    halongbay2days: {
      name: "Ha Long Bay 2 Days 1 Night",
      icon: <Zap className="w-6 h-6" />,
      price: 890000,
      originalPrice: 1290000,
      period: "/person",
      color: "secondary",
      duration: "2 days 1 night",
      destination: "Ha Long Bay",
      features: [
        "Overnight cruise on the bay",
        "Thien Cung Cave exploration",
        "Kayaking adventure",
        "Fresh seafood buffet",
        "Modern limousine transport",
        "Professional tour guide",
        "Comprehensive travel insurance",
      ],
    },
    saigon4days: {
      name: "Saigon - Mekong Delta 4 Days",
      icon: <Crown className="w-6 h-6" />,
      price: 1990000,
      originalPrice: 2990000,
      period: "/person",
      color: "warning",
      duration: "4 days 3 nights",
      destination: "Ho Chi Minh City - Can Tho - Ca Mau",
      features: [
        "5-star hotel with Saigon River view",
        "Cai Rang floating market tour",
        "Tra Su Cajuput Forest exploration",
        "Authentic Mekong Delta cuisine",
        "VIP Limousine transport",
        "Local expert guide",
        "Premium insurance coverage",
        "Local specialty gifts included",
      ],
    },
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getSavings = () => {
    const tour = tourDetails[selectedTour];
    return tour.originalPrice - tour.price;
  };

  const getTotalPrice = () => {
    const basePrice = priceFromUrl || tourDetails[selectedTour].price;
    return basePrice * numberOfPeople;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "zalopay") {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/payment/create-order`,
          {
            amount: getTotalPrice(),
          }
        );

        const paymentLink = res.data?.data?.order_url;

        if (paymentLink) {
          window.open(paymentLink);
        } else {
          console.error("No payment link in response");
        }
      } catch (error) {
        console.error("Error calling payment API:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div
        className="min-vh-100 py-4"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #0ea5e9 50%, #1e293b 100%)",
        }}
      >
        <div className="container-xl">
          {/* Header */}
          <div className="mb-4">
            <Link
              href="/tours"
              className="d-flex align-items-center text-decoration-none text-light-emphasis mb-3"
              style={{ color: "#9ca3af" }}
            >
              <ArrowLeft className="me-2" size={20} />
              <span>Back to tour list</span>
            </Link>
            <h1 className="display-5 fw-bold text-white mb-2">
              Complete Your Booking
            </h1>
            <p className="text-light-emphasis" style={{ color: "#9ca3af" }}>
              Just one more step to confirm your amazing journey
            </p>
          </div>

          <div className="row g-4">
            {/* Left Column - Form */}
            <div className="col-lg-7">
              {/* Booking Information */}
              {paymentMethod !== "zalopay" && (
                <div
                  className="card border-0 mb-4"
                  style={{
                    backgroundColor: "rgba(31, 41, 55, 0.3)",
                    backdropFilter: "blur(10px)",
                    borderColor: "#374151 !important",
                  }}
                >
                  <div className="card-body p-4">
                    <h2 className="h4 text-white mb-4 d-flex align-items-center">
                      <User className="me-2" size={20} />
                      <span>Customer Information</span>
                    </h2>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-light fw-medium">
                          Full Name (Lead Traveler) *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-light fw-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="email@example.com"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-light fw-medium">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-light fw-medium">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="Street address"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label text-light fw-medium">
                          Special Requests
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="Dietary restrictions, room preferences, special occasions..."
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div
                className="card border-0"
                style={{
                  backgroundColor: "rgba(31, 41, 55, 0.3)",
                  backdropFilter: "blur(10px)",
                  borderColor: "#374151 !important",
                }}
              >
                <div className="card-body p-4">
                  <h2 className="h4 text-white mb-4 d-flex align-items-center">
                    <CreditCard className="me-2" size={20} />
                    <span>Payment Method</span>
                  </h2>

                  {/* Payment Options */}
                  <div className="row g-3 mb-4">
                    {[
                      {
                        id: "card",
                        name: "Credit/Debit Card",
                        icon: <CreditCard size={20} />,
                      },
                      {
                        id: "zalopay",
                        name: "Zalopay",
                        icon: (
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "#007bff",
                            }}
                          >
                            <span
                              className="text-white fw-bold"
                              style={{ fontSize: "10px" }}
                            >
                              Z
                            </span>
                          </div>
                        ),
                      },
                      {
                        id: "bank",
                        name: "Bank Transfer",
                        icon: <MapPin size={20} />,
                      },
                    ].map((method) => (
                      <div key={method.id} className="col-md-4">
                        <button
                          onClick={() => setPaymentMethod(method.id)}
                          className={`btn w-100 p-3 d-flex align-items-center justify-content-center payment-method-btn ${
                            paymentMethod === method.id ? "active" : ""
                          }`}
                        >
                          <div className="d-flex align-items-center">
                            {method.icon}
                            <span className="ms-2 small fw-medium">
                              {method.name}
                            </span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label text-light fw-medium">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="col-md-8">
                        <label className="form-label text-light fw-medium">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="JOHN SMITH"
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label text-light fw-medium">
                          MM/YY *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="12/25"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-light fw-medium">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="form-control custom-input"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "zalopay" && (
                    <div className="text-center py-5">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                          width: "64px",
                          height: "64px",
                          backgroundColor: "#007bff",
                        }}
                      >
                        <span className="text-white fw-bold fs-4">Z</span>
                      </div>
                      <p className="text-light-emphasis">
                        You will be redirected to Zalopay to complete your tour
                        payment securely
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div
                      className="rounded p-3"
                      style={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
                    >
                      <h4 className="text-white fw-medium mb-2">
                        Bank Transfer Details:
                      </h4>
                      <div className="small text-light-emphasis">
                        <p className="mb-1">Bank: Chase Bank</p>
                        <p className="mb-1">Account Number: 1234567890</p>
                        <p className="mb-1">Account Name: ABC TRAVEL COMPANY</p>
                        <p className="mb-1">Swift Code: CHASUS33</p>
                        <p className="mb-0">
                          Reference: {formData.fullName || "[Your Name]"} - Tour{" "}
                          {tourDetails[selectedTour].name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Tour Summary */}
            <div className="col-lg-5">
              <div className="sticky-top" style={{ top: "2rem" }}>
                {/* Tour Summary */}
                <div
                  className="card border-0 mb-3"
                  style={{
                    backgroundColor: "rgba(31, 41, 55, 0.3)",
                    backdropFilter: "blur(10px)",
                    borderColor: "#374151 !important",
                  }}
                >
                  <div className="card-body p-4">
                    <h2 className="h4 text-white mb-4">Tour Summary</h2>

                    <div
                      className="d-flex align-items-center p-3 rounded mb-3"
                      style={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
                    >
                      <div
                        className={`p-3 rounded-circle me-3 bg-${tourDetails[selectedTour].color}`}
                      >
                        {tourDetails[selectedTour].icon}
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="h6 text-white fw-semibold mb-1">
                          {tourDetails[selectedTour].name}
                        </h3>
                        <p className="small text-light-emphasis mb-0">
                          {tourDetails[selectedTour].destination}
                        </p>
                      </div>
                    </div>

                    {/* Tour Details */}
                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <div className="d-flex align-items-center text-light-emphasis">
                          <Calendar className="me-2" size={16} />
                          <div>
                            <div className="small">Departure Date</div>
                            <div className="fw-medium text-white">
                              {formatDate(tourDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center text-light-emphasis">
                          <Users className="me-2" size={16} />
                          <div>
                            <div className="small">Travelers</div>
                            <div className="fw-medium text-white">
                              {numberOfPeople}{" "}
                              {numberOfPeople === 1 ? "person" : "people"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div
                      className="border-top pt-3"
                      style={{ borderColor: "#374151 !important" }}
                    >
                      <div className="d-flex justify-content-between text-light-emphasis mb-2">
                        <span>Tour price/person</span>
                        <span className="text-decoration-line-through">
                          {formatPrice(tourDetails[selectedTour].originalPrice)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between text-light-emphasis mb-2">
                        <span>Discounted price</span>
                        <span>
                          {formatPrice(
                            priceFromUrl || tourDetails[selectedTour].price
                          )}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between text-light-emphasis mb-2">
                        <span>Number of travelers × {numberOfPeople}</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                      <div className="d-flex justify-content-between text-success fw-medium mb-3">
                        <span>You save</span>
                        <span>
                          -{formatPrice(getSavings() * numberOfPeople)}
                        </span>
                      </div>
                      <div
                        className="d-flex justify-content-between h4 text-white fw-bold pt-3 border-top"
                        style={{ borderColor: "#374151 !important" }}
                      >
                        <span>Total Amount</span>
                        <span>
                          {parsedPrice !== null ? (
                            <p>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(parsedPrice)}
                            </p>
                          ) : (
                            <p>Loading ...</p>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Tour Highlights */}
                    <div
                      className="rounded p-3 mt-4"
                      style={{
                        backgroundColor: "rgba(14, 165, 233, 0.1)",
                        border: "1px solid rgba(14, 165, 233, 0.2)",
                      }}
                    >
                      <h4 className="text-white fw-medium mb-2 d-flex align-items-center">
                        <Gift className="me-2" size={16} />
                        <span>Tour Highlights:</span>
                      </h4>
                      <ul className="list-unstyled mb-0">
                        {tourDetails[selectedTour].features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="d-flex align-items-start small text-light-emphasis mb-1"
                            >
                              <Check
                                className="text-success me-2 flex-shrink-0 mt-1"
                                size={12}
                              />
                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Security Notice */}
                    <div
                      className="d-flex align-items-center small text-light-emphasis rounded p-3 mt-3"
                      style={{ backgroundColor: "rgba(55, 65, 81, 0.2)" }}
                    >
                      <Shield
                        className="text-success me-2 flex-shrink-0"
                        size={16}
                      />
                      <span>SSL secured payment - Book with confidence</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleSubmit}
                  className="btn btn-lg w-100 text-white fw-bold py-3 d-flex align-items-center justify-content-center mb-3 payment-btn"
                >
                  <Lock className="me-2" size={20} />
                  <span>Confirm Booking</span>
                </button>

                {/* Guarantee */}
                <div className="text-center small text-light-emphasis">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <AlertCircle className="me-1" size={16} />
                    <span>Flexible cancellation policy</span>
                  </div>
                  <p className="mb-0">
                    Free cancellation up to 7 days before departure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-input {
          background-color: rgba(55, 65, 81, 0.5) !important;
          border-color: #4b5563 !important;
          color: #fff !important;
        }

        .custom-input:focus {
          border-color: #0ea5e9 !important;
          box-shadow: 0 0 0 0.2rem rgba(14, 165, 233, 0.25) !important;
          background-color: rgba(55, 65, 81, 0.5) !important;
          color: #fff !important;
        }

        .custom-input::placeholder {
          color: #9ca3af !important;
        }

        .payment-method-btn {
          background-color: transparent !important;
          border-color: #4b5563 !important;
          color: #fff !important;
          transition: all 0.3s ease;
        }

        .payment-method-btn:hover {
          transform: translateY(-1px);
          border-color: #0ea5e9 !important;
        }

        .payment-method-btn.active {
          background-color: rgba(14, 165, 233, 0.1) !important;
          border-color: #0ea5e9 !important;
        }

        .payment-btn {
          background: linear-gradient(45deg, #0ea5e9, #06b6d4) !important;
          border: none !important;
          transition: all 0.3s ease;
        }

        .payment-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .text-light-emphasis {
          color: #9ca3af !important;
        }

        @media (max-width: 768px) {
          .sticky-top {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default Checkout;
