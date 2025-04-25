"use client";
import ReveloLayout from "@/layout/ReveloLayout";
import Banner from "@/components/Banner";
import { useState } from "react"; // Import useState
import Image from 'next/image';  // Import Image from next/image

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        address: "", // Đổi Country thành Address
    });

    const [cart, setCart] = useState({
        items: [
            { name: "DuoComfort Sofa Premium", quantity: 1, price: 20 },
            { name: "IronOne Desk", quantity: 1, price: 25 },
        ],
        shipping: 5,
        discount: 0, // Giá trị mặc định
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    const calculateSubtotal = () => {
        return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + cart.shipping + cart.discount;
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDiscountChange = (e) => {
        const value = parseFloat(e.target.value) || 0; // Chuyển đổi thành số
        setCart({ ...cart, discount: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic thanh toán ở đây
        console.log("Form Data Submitted:", formData);
        console.log("Payment Method:", paymentMethod);
        alert("Checkout submitted!");
    };

    const PaymentOptions = ({ selectedPaymentMethod, onPaymentMethodChange }) => {
        const paymentMethods = [
            { id: 'cash', label: 'Thanh toán tiền mặt khi nhận hàng', image: null },
            { id: 'momo', label: 'Thanh toán bằng ví MoMo', image: '/assets/images/logos/momo-logo.png' },
            { id: 'zalopay', label: 'Thanh toán bằng ví ZaloPay', image: '/assets/images/logos/zalo-logo.png' },
            { id: 'paypal', label: 'Thanh toán bằng PayPal', image: '/assets/images/logos/paypal-logo.png' },
        ];

        return (
            <div className="payment-options-container">
                <h5>Chọn hình thức thanh toán</h5>
                {paymentMethods.map((method) => (
                    <div key={method.id} className="payment-method-item">
                        <label className="payment-method-label">
                            <input
                                type="radio"
                                value={method.id}
                                checked={selectedPaymentMethod === method.id}
                                onChange={onPaymentMethodChange}
                                className="payment-method-radio"
                            />
                            {method.image && (
                                <Image
                                    src={method.image}
                                    alt={method.label}
                                    width={30}
                                    height={30}
                                    className="payment-method-image"
                                />
                            )}
                            <span>{method.label}</span>
                            {method.discount && <span className="discount-label">{method.discount}</span>}
                        </label>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ReveloLayout>
            <Banner pageTitle="Checkout" pageName="Checkout" />

            <section className="checkout-page">
                <div className="container">
                    <div className="checkout-grid">
                        <div className="shipping-information">
                            <h2>Shipping Information</h2>
                            <form onSubmit={handleSubmit} className="shipping-form">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full name *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailAddress">Email address *</label>
                                    <input
                                        type="email"
                                        id="emailAddress"
                                        name="emailAddress"
                                        className="form-control"
                                        value={formData.emailAddress}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone number *</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address *</label> {/* Đổi Country thành Address */}
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"  // Optional: You can specify the initial number of rows
                                        required
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="review-cart">
                            <h2>Review your cart</h2>
                            {cart.items.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <span>{item.name}</span>
                                    <span>
                                        {item.quantity} x ${item.price}
                                    </span>
                                </div>
                            ))}
                            <div className="discount-code">
                                <span>Discount</span>
                                <input
                                    type="text"
                                    value={cart.discount}
                                    onChange={handleDiscountChange}
                                    placeholder="Enter discount"
                                    className="discount-input"
                                />
                            </div>

                            <div className="summary">
                                <div>
                                    <span>Subtotal</span>
                                    <span>${calculateSubtotal()}</span>
                                </div>
                                <div>
                                    <span>Shipping</span>
                                    <span>${cart.shipping}</span>
                                </div>
                                <div>
                                    <span>Discount</span>
                                    <span>${cart.discount}</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>

                            {/* Thay thế các nút thanh toán bằng component PaymentOptions */}
                            <PaymentOptions
                                selectedPaymentMethod={paymentMethod}
                                onPaymentMethodChange={handlePaymentMethodChange}
                            />

                            {/* Nút Checkout */}
                            <button onClick={handleSubmit} className="checkout-button">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </ReveloLayout>
    );
};

export default CheckoutPage;