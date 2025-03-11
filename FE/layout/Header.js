"use client";
import useClickOutside from "@/utility/useClickOutside";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { Accordion } from "react-bootstrap";

const Menu = () => {
  return (
    <nav className="main-menu navbar-expand-lg">
      <Accordion>
        <div className="navbar-header">
          <div className="mobile-logo">
            <Link href="/">
              <img src="assets/images/logos/logo.png" alt="Logo" title="Logo" />
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
          className="navbar-collapse  clearfix"
        >
          <ul className="navigation clearfix">
            <li className="current">
              <a href="/">Home</a>
            </li>
            <li>
              <Link href="about">About</Link>
            </li>
            <li>
              <a href="tour-list">Tours</a>
            </li>
            <li>
              <a href="destination1">Destinations</a>
            </li>
            <li className="dropdown">
              <a href="#">Pages</a>
              <ul>
                <li>
                  <Link href="faqs">FAQs</Link>
                </li>
                <li>
                  <a href="gellery-grid">Gallery</a>
                </li>
                <li>
                  <Link href="contact">Contact Us</Link>
                </li>
                {/* <li>
                  <Link href="404">404 Error</Link>
                </li> */}
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

const Header = ({ header }) => {
  const sidebarClick = () =>
    document.querySelector("body").classList.toggle("side-content-visible");

  switch (header) {
    case 1:
      return <Header1 sidebarClick={sidebarClick} />;
    case 2:
      return <Header2 sidebarClick={sidebarClick} />;

    default:
      return <Header3 sidebarClick={sidebarClick} />;
  }
};
export default Header;

const Header1 = ({ sidebarClick }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const domNode = useClickOutside(() => {
    setToggleSearch(false);
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Fragment>
      <header className="main-header header-one white-menu menu-absolute fixed-header">
        {/*Header-Upper*/}
        <div className="header-upper py-30 rpy-0">
          <div className="container-fluid clearfix">
            <div className="header-inner rel d-flex align-items-center">
              <div className="logo-outer">
                <div className="logo">
                  <Link href="/">
                    <img
                      src="assets/images/logos/logo.png"
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
              {/* Nav Search */}
              <div className="nav-search">
                <button
                  className="far fa-search"
                  onClick={() => setToggleSearch(!toggleSearch)}
                />
                <form
                  action="#"
                  className={toggleSearch ? "" : "hide"}
                  ref={domNode}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="searchbox"
                    required
                  />
                  <button
                    type="submit"
                    className="searchbutton far fa-search"
                  />
                </form>
              </div>
              {/* Menu Button */}
              <div className="menu-btns py-10">
                <Link
                  href="contact"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Book Now">Book Now</span>
                  <i className="fal fa-arrow-right" />
                </Link>
                {/* menu sidbar */}
                <div className="menu-sidebar">
                  <div
                    className="dropdown"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src="/assets/images/icons/icon-user.png"
                      alt="Login"
                      width={50}
                      height={50}
                      className="user-avatar"
                    />

                    <ul
                      className={`dropdown-menu ${
                        isDropdownOpen ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link href="/login">Login</Link>
                      </li>
                      <li>
                        <Link href="/my-account">My Account</Link>
                      </li>
                      <li>
                        <Link href="/settings">Settings</Link>
                      </li>
                      <li>
                        <Link href="/login">Logout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
      {/* <Sidebar sidebarClick={sidebarClick} /> */}
    </Fragment>
  );
};

const Header3 = ({ sidebarClick }) => {
  return (
    <Fragment>
      <header className="main-header header-one">
        {/*Header-Upper*/}
        <div className="header-upper bg-white py-30 rpy-0">
          <div className="container-fluid clearfix">
            <div className="header-inner rel d-flex align-items-center">
              <div className="logo-outer">
                <div className="logo">
                  <Link href="/">
                    <img
                      src="assets/images/logos/logo-two.png"
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
              {/* Menu Button */}
              <div className="menu-btns py-10">
                <Link
                  href="contact"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Book Now">Book Now</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
      {/* <Sidebar sidebarClick={sidebarClick} /> */}
    </Fragment>
  );
};
