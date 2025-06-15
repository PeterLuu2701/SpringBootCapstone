// components/admin-navbar/AdminNavbar.js
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNavbar = () => {
    const pathname = usePathname();

    return (
        <nav id="sidebarMenu" className="d-lg-block bg-light admin-navbar" style={{ width: '220px', height: '100vh', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-1 mt-3">
                    <Link href="/admin/dashboard" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/dashboard' ? 'active text-white' : ''}`} style={{ border: 'none', backgroundColor: pathname === '/admin/dashboard' ? '#007bff' : 'transparent', color: pathname === '/admin/dashboard' ? 'white' : 'inherit' }}>
                        <i className="fas fa-chart-line fa-fw me-3"></i><span>Dashboard</span>
                    </Link>
                    <Link href="/admin/your-information" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/your-information' ? 'active' : ''}`}>
                        <i className="fas fa-user-circle fa-fw me-3"></i><span>Your Information</span>
                    </Link>
                    <Link href="/admin" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin' ? 'active' : ''}`}>
                        <i className="fas fa-users fa-fw me-3"></i><span>Users</span>
                    </Link>
                    <Link href="/admin/destinations" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/destinations' ? 'active' : ''}`}>
                        <i className="fas fa-map-marker-alt fa-fw me-3"></i><span>Destinations</span>
                    </Link>
                    <Link href="/admin/tours" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/tours' ? 'active' : ''}`}>
                        <i className="fas fa-route fa-fw me-3"></i><span>Tours</span>
                    </Link>
                    <Link href="/admin/bookings" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/bookings' ? 'active' : ''}`}>
                        <i className="fas fa-calendar-check fa-fw me-3"></i><span>Bookings</span>
                    </Link>
                    <Link href="/admin/blog" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/blog' ? 'active' : ''}`}>
                        <i className="fas fa-newspaper fa-fw me-3"></i><span>Blog</span>
                    </Link>
                    <Link href="/admin/contact" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/contact' ? 'active' : ''}`}>
                        <i className="fas fa-phone fa-fw me-3"></i><span>Contact</span>
                    </Link>
                    <Link href="/admin/payments" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/payments' ? 'active text-white' : ''}`} style={{ border: 'none', backgroundColor: pathname === '/admin/payments' ? '#007bff' : 'transparent', color: pathname === '/admin/payments' ? 'white' : 'inherit' }}>
                        <i className="fas fa-money-bill-wave fa-fw me-3"></i><span>Payments</span>
                    </Link>
                    <Link href="/admin/reviews" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/reviews' ? 'active text-white' : ''}`} style={{ border: 'none', backgroundColor: pathname === '/admin/reviews' ? '#007bff' : 'transparent', color: pathname === '/admin/reviews' ? 'white' : 'inherit' }}>
                        <i className="fas fa-star fa-fw me-3"></i><span>Reviews</span>
                    </Link>
                    <Link href="/admin/coupons" className={`list-group-item list-group-item-action py-2 ripple ${pathname === '/admin/coupons' ? 'active text-white' : ''}`} style={{ border: 'none', backgroundColor: pathname === '/admin/coupons' ? '#007bff' : 'transparent', color: pathname === '/admin/coupons' ? 'white' : 'inherit' }}>
                        <i className="fas fa-tag fa-fw me-3"></i><span>Coupons</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;