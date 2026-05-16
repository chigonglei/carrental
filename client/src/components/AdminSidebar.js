import {
  Link,
  useLocation
} from "react-router-dom";

import "../styles/adminSidebar.css";

function AdminSidebar() {

  const location =
    useLocation();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";

  };

  return (

    <div className="admin-sidebar">

      <h2>
        Admin Panel
      </h2>

      <Link
        to="/admin/dashboard"
        className={
          location.pathname ===
          "/admin/dashboard"
            ? "active"
            : ""
        }
      >
        Dashboard
      </Link>

      <Link
        to="/admin/users"
        className={
          location.pathname ===
          "/admin/users"
            ? "active"
            : ""
        }
      >
        Users
      </Link>

      <Link
        to="/admin/cars"
        className={
          location.pathname ===
          "/admin/cars"
            ? "active"
            : ""
        }
      >
        Cars
      </Link>

      <Link
        to="/admin/bookings"
        className={
          location.pathname ===
          "/admin/bookings"
            ? "active"
            : ""
        }
      >
        Bookings
      </Link>

      <button
        onClick={logout}
      >
        Logout
      </button>

    </div>

  );

}

export default AdminSidebar;