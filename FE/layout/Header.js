"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Accordion } from "react-bootstrap";

const Menu = () => {
  return (
    <nav className="main-menu navbar-expand-lg">
      <Accordion>
        <div className="navbar-header">
          <div className="mobile-logo">
            <Link href="/">
              <img src="assets/images/logos/bootcamp.png" alt="Logo" title="Logo" />
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
              <a href="tour-list">Tours</a>
            </li>
            <li>
              <a href="destination1">Destinations</a>
            </li>
            <li>
              <a href="blog">Blog</a>
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
                      src="assets/images/logos/bootcamp.png"
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
                  href="login"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Log In">Log In</span>
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

export default Header;