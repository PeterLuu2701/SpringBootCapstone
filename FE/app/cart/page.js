"use client";
import ReveloLayout from "@/layout/ReveloLayout";
import Banner from "@/components/Banner";
import TourItem from "@/components/tour-item/TourItem"; // Import TourItem
import Link from "next/link";

const CartPage = () => {
  // Dummy cart items (replace with actual data AND add TourItem props!)
  const cartItems = [
    {
      id: 1,
      name: "Tour 1",
      price: 100,
      quantity: 2,
      imageUrl: "assets/images/destinations/tour-list1.jpg", // Add image URL
      location: "Bali, Indonesia", // Add location
      rating: 5, // Add rating (or use a default)
      description: "A fantastic tour in Bali!", // Add a description
      duration: "3 days 2 nights",
      guests: "5-8",
      badgeText: "Featured", // add the badge
      badgeClass: "bgc-pink",
    },
    {
      id: 2,
      name: "Tour 2",
      price: 150,
      quantity: 1,
      imageUrl: "assets/images/destinations/tour-list2.jpg", // Add image URL
      location: "Rome, Italy", // Add location
      rating: 4, // Add rating (or use a default)
      description: "Explore the ancient city of Rome!", // Add a description
      duration: "4 days 3 nights",
      guests: "2-4",
      discount: "10% Off",
    },
  ];

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shippingCost = 10; // Make shipping cost a variable

  return (
    <ReveloLayout>
      <Banner pageTitle="Shopping Cart" pageName="Cart" />

      <section className="cart-page py-100 rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <TourItem
                      imageUrl={item.imageUrl}
                      location={item.location}
                      rating={item.rating}
                      title={item.name}
                      description={item.description}
                      duration={item.duration}
                      guests={item.guests}
                      price={item.price}
                      //Other required props from TourItem Component
                      featured={item.badgeText === "Featured"}
                      badgeText={item.badgeText}
                      badgeClass={item.badgeClass}
                      discount={item.discount}
                    />
                    {/* Quantity display and controls (adjust as needed) */}
                    <div className="quantity-controls">
                      Quantity: {item.quantity}
                      {/* Add + and - buttons to change quantity and update state! */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              {/* Cart Summary Section */}
              <div className="cart-summary-container">
                <h3 className="cart-summary-title">Cart Summary</h3>
                <div className="cart-summary-details">
                  <div className="cart-summary-item">
                    <span>Subtotal:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="cart-summary-item">
                    <span>Shipping:</span>
                    <span>${shippingCost}</span>
                  </div>
                  <div className="cart-summary-total">
                    <span>Total:</span>
                    <span>${calculateTotal() + shippingCost}</span>
                  </div>
                </div>
                <Link href="/checkout" className="main-btn">
                  Proceed To Checkout
                </Link>
              </div>
              {/* End Cart Summary Section */}
            </div>
          </div>
        </div>
      </section>
    </ReveloLayout>
  );
};

export default CartPage;