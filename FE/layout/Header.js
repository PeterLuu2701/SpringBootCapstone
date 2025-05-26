"use client";
import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Menu = () => {
    return (
        <nav className="main-menu navbar-expand-lg">
            <Accordion>
                <div className="navbar-header">
                    <div className="mobile-logo">
                        <Link href="/">
                            <img src="/assets/images/logos/bootcamp.png" alt="Logo" title="Logo" />
                        </Link>
                    </div>
                    {/* Toggle Button */}
                    <Accordion.Toggle
                        as={"button"}
                        type="button"
                        className="navbar-toggle"
                        eventKey="collapse"
                    >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </Accordion.Toggle>
                </div>
                <Accordion.Collapse
                    eventKey="collapse"
                    className="navbar-collapse clearfix"
                >
                    <ul className="navigation clearfix">
                        <li className="current">
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <Link href="about">About</Link>
                        </li>
                        <li>
                            <Link href="tour-list">Tours</Link>
                        </li>
                        <li>
                            <Link href="destination">Destinations</Link>
                        </li>
                        <li>
                            <Link href="blog">Blog</Link>
                        </li>
                        <li className="dropdown">
                            <a href="#">Pages</a>
                            <ul>
                                <li>
                                    <Link href="faqs">FAQs</Link>
                                </li>
                                <li>
                                    <Link href="gellery-grid">Gallery</Link>
                                </li>
                                <li>
                                    <Link href="contact">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="dropdown-btn">
                                <span className="far fa-angle-down" />
                            </div>
                        </li>
                    </ul>
                </Accordion.Collapse>
            </Accordion>
        </nav>
    );
};

const Header = () => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [username, setUsername] = useState(""); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State để kiểm tra đã đăng nhập hay chưa
    const router = useRouter(); 

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        
        console.log("Tìm kiếm:", searchTerm);
        
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function để logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
        router.push("/"); // Chuyển hướng về trang chủ sau khi logout
    };

    
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Sử dụng useEffect để kiểm tra localStorage khi component được mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsername = localStorage.getItem("username");
            const storedToken = localStorage.getItem("token");
            if (storedUsername && storedToken) {
                setUsername(storedUsername);
                setIsLoggedIn(true);
            }
        }
    }, []);

    return (
        <Fragment>
            <header className="main-header header-one">
                {/*Header-Upper*/}
                <div className="header-upper bg-white rpy-0">
                    <div className="container-fluid clearfix">
                        <div className="header-inner rel d-flex align-items-center">
                            <div className="logo-outer">
                                <div className="logo">
                                    <Link href="/">
                                        <img
                                            src="/assets/images/logos/bootcamp.png"
                                            alt="Logo"
                                            title="Logo"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
                                {/* Main Menu */}
                                <Menu />
                                {/* Main Menu End*/}
                            </div>

                            <div className="nav-search">
                                <button
                                    className="far fa-search"
                                    onClick={() => setToggleSearch(!toggleSearch)}
                                />
                                {toggleSearch && (
                                    <form onSubmit={handleSearchSubmit}>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit">Tìm</button>
                                    </form>
                                )}
                                {isLoggedIn && <span style={{ marginLeft: '10px' }}>Hi, {username}</span>} {/* Hiển thị username sau khi đăng nhập */}
                            </div>

                            {/* Menu Button */}
                            <div className="menu-btns py-10">
                                {!isLoggedIn ? (
                                    <Link
                                        href="login"
                                        className="theme-btn style-two bgc-secondary"
                                    >
                                        <span data-hover="Log In">Log In</span>
                                    </Link>
                                ) : null}
                            </div>

                            {/* Avatar Dropdown */}
                            {isLoggedIn && (
                                <div className="avatar-dropdown" ref={dropdownRef}>
                                    <div className="avatar-button" onClick={toggleDropdown}>
                                        <Image
                                            src="/assets/images/icons/avatar.png" 
                                            alt="User Avatar"
                                            width={45}
                                            height={45}
                                            style={{ borderRadius: '50%' }}
                                        />
                                    </div>

                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link href="/my-account">My Account</Link>
                                            </li>
                                            <li>
                                                <Link href="/history">History</Link>
                                            </li>
                                            <li>
                                                <Link href="/change-password">Change Password</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                {/*End Header Upper*/}
            </header>
        </Fragment>
    );
};

export default Header;