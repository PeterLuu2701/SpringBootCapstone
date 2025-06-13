"use client"; // Đảm bảo dòng này có ở đầu file Header.js

import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Component Menu (định nghĩa bên ngoài hoặc bên trong tùy cách bạn muốn quản lý)
const Menu = () => {
    return (
        <nav className="main-menu navbar-expand-lg">
            <Accordion>
                <div className="navbar-header">
                    <div className="mobile-logo">
                        <Link href="/">
                            {/* Sử dụng component Image của Next.js */}
                            <Image src="/assets/images/logos/logo.png" alt="Logo" title="Logo" width={100} height={50} /> {/* Cần thêm width và height */}
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
                            {/* Sử dụng Link của Next.js */}
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="about">About</Link>
                        </li>
                        <li>
                            {/* Đảm bảo route này tồn tại trong ứng dụng Next.js của bạn */}
                            <Link href="tour-list">Tours</Link>
                        </li>
                        <li>
                            <Link href="destination">Destinations</Link>
                        </li>
                        <li>
                            <Link href="blog">Blog</Link>
                        </li>
                        <li className="dropdown">
                            {/* Link không có href="#" cho mục menu cha */}
                            <a href="#">Pages</a> {/* Hoặc chỉ dùng span nếu không muốn link */}
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("Tìm kiếm:", searchTerm);
        // TODO: Thực hiện logic tìm kiếm thực tế, có thể điều hướng đến trang tìm kiếm với query param
        // Ví dụ: router.push(`/search?term=${searchTerm}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') { // Kiểm tra chỉ chạy ở client
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setIsLoggedIn(false);
            setUsername("");
            router.push("/");
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        // Chỉ add event listener ở client
        if (typeof window !== 'undefined') {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
             // Chỉ remove event listener ở client
            if (typeof window !== 'undefined') {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [dropdownRef]);

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
                {/* FIX HERE: Thay class="header-upper ..." bằng className="header-upper ..." */}
                <div className="header-upper bg-white py-30 rpy-0"> {/* <<< Đã sửa lỗi class -> className */}
                    <div className="container-fluid clearfix">
                        <div className="header-inner rel d-flex align-items-center">
                            <div className="logo-outer">
                                <div className="logo">
                                    <Link href="/">
                                         {/* Sử dụng component Image của Next.js */}
                                        <Image
                                            src="/assets/images/logos/logo-two.png"
                                            alt="Logo"
                                            title="Logo"
                                            width={150} // Cần thêm width và height
                                            height={50}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
                                {/* Main Menu */}
                                <Menu /> {/* Render component Menu */}
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
                                {isLoggedIn && <span style={{ marginLeft: '10px' }}>Hi, {username}</span>}
                            </div>

                            {/* Menu Button (Log In) */}
                            <div className="menu-btns py-10">
                                {!isLoggedIn && ( // Chỉ render button Log In khi chưa đăng nhập
                                    <Link
                                        href="/login" // Đảm bảo route này tồn tại
                                        className="theme-btn style-two bgc-secondary"
                                    >
                                        <span data-hover="Log In">Log In</span>
                                    </Link>
                                )}
                            </div>

                            {/* Avatar Dropdown (User Menu) */}
                            {isLoggedIn && ( // Chỉ render dropdown khi đã đăng nhập
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
                                                <Link href="/my-account">My Account</Link> {/* Đảm bảo các route này tồn tại */}
                                            </li>
                                            <li>
                                                <Link href="/history">History</Link>
                                            </li>
                                            <li>
                                                <Link href="/change-password">Change Password</Link>
                                            </li>
                                            <li>
                                                {/* Sử dụng button và className cho style */}
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