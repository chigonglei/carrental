import {
  useState,
  useEffect
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [scrolled,
    setScrolled] =
    useState(false);

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    const handleScroll =
      () => {

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

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");

    };

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

      {/* Navbar */}

      <nav
        className={
          scrolled
            ? "navbar scrolled"
            : "navbar"
        }
      >

        {/* Logo */}

        <Link
          to="/"
          className="logo"
        >
          DriveFleet
        </Link>

        {/* Desktop Menu */}

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

          {

            user ? (

              <>

                {

                  user.role ===
                  "owner" && (

                    <Link
                      to="/owner/dashboard"
                    >
                      Dashboard
                    </Link>

                  )

                }

                {

                  user.role ===
                  "admin" && (

                    <Link
                      to="/admin/dashboard"
                    >
                      Admin
                    </Link>

                  )

                }

                {

                  user.role ===
                  "renter" && (

                    <Link
                      to="/my-bookings"
                    >
                      My Bookings
                    </Link>

                  )

                }

                <Link
                  to="/profile"
                >
                  Profile
                </Link>

                <button
                  className="logout-btn"
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className={
                    location.pathname ===
                    "/login"
                      ? "active-link"
                      : ""
                  }
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={
                    location.pathname ===
                    "/register"
                      ? "active-link"
                      : ""
                  }
                >
                  Register
                </Link>

              </>

            )

          }

          {/* Dark Mode */}

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            {

              darkMode
                ? <FaSun />
                : <FaMoon />

            }

          </button>

        </div>

        {/* Mobile Actions */}

        <div className="mobile-actions">

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
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
              setMenuOpen(
                !menuOpen
              )
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

      {/* Mobile Sidebar */}

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

        {

          user ? (

            <>

              {

                user.role ===
                "owner" && (

                  <Link
                    to="/owner/dashboard"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    Dashboard
                  </Link>

                )

              }

              {

                user.role ===
                "admin" && (

                  <Link
                    to="/admin/dashboard"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    Admin
                  </Link>

                )

              }

              {

                user.role ===
                "renter" && (

                  <Link
                    to="/my-bookings"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    My Bookings
                  </Link>

                )

              }

              <Link
                to="/profile"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Profile
              </Link>

              <button
                className="logout-btn"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </>

          ) : (

            <>

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
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Register
              </Link>

            </>

          )

        }

      </div>

    </>

  );

}

export default Navbar;