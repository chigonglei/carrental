import { useState, useEffect } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const location = useLocation();

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

    }

  }, [darkMode]);

  return (
    <>
      {/* Overlay */}

      {
        menuOpen && (
          <div
            className="overlay"
            onClick={() =>
              setMenuOpen(false)
            }
          />
        )
      }

      <nav
        className={
          scrolled
            ? "navbar scrolled"
            : "navbar"
        }
      >

        <Link to="/" className="logo">
  DriveFleet
</Link>

        {/* Desktop */}

        <div className="nav-links">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active-link"
                : ""
            }
          >
            Home
          </Link>

          <Link
            to="/cars"
            className={
              location.pathname === "/cars"
                ? "active-link"
                : ""
            }
          >
            Cars
          </Link>

          <Link
            to="/login"
            className={
              location.pathname === "/login"
                ? "active-link"
                : ""
            }
          >
            Login
          </Link>

          <Link
  to="/register"
  className={
    location.pathname === "/register"
      ? "active-link"
                : ""
  }
>
  Register
</Link>

          {/* Dark Toggle */}

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {
              darkMode
                ? <FaSun />
                : <FaMoon />
            }
          </button>

        </div>

        {/* Mobile Right */}

        <div className="mobile-actions">

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {
              darkMode
                ? <FaSun />
                : <FaMoon />
            }
          </button>

          <div
            className="menu-icon"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {
              menuOpen
                ? <FaTimes />
                : <FaBars />
            }
          </div>

        </div>

      </nav>

      {/* Sidebar */}

      <div
        className={
          menuOpen
            ? "mobile-menu active"
            : "mobile-menu"
        }
      >

        <Link
          to="/"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Home
        </Link>

        <Link
          to="/cars"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Cars
        </Link>

        <Link
          to="/login"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Login
        </Link>

        <Link
  to="/register"
  className={
    location.pathname === "/register"
      ? "register-btn register-active"
      : "register-btn"
  }
>
  Register
</Link>

      </div>
    </>
  );
}

export default Navbar;