import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout
from "../../components/AdminLayout";
import "../../styles/admin.css";

function AdminDashboard() {

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalCars: 0,
      totalBookings: 0
    });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="admin-dashboard">

        <h1>
          Admin Dashboard
        </h1>

        <div className="admin-stats">

  <div className="admin-card">

    <h2>
      Users
    </h2>

    <p>
      {stats.totalUsers}
    </p>

  </div>

  <div className="admin-card">

    <h2>
      Cars
    </h2>

    <p>
      {stats.totalCars}
    </p>

  </div>

  <div className="admin-card">

    <h2>
      Bookings
    </h2>

    <p>
      {stats.totalBookings}
    </p>

  </div>

  <div className="admin-card">

    <h2>
      Revenue
    </h2>

    <p>
      ₹{stats.totalRevenue}
    </p>

  </div>

  <div className="admin-card">

    <h2>
      Pending
    </h2>

    <p>
      {stats.pendingBookings}
    </p>

  </div>

  <div className="admin-card">

    <h2>
      Approved
    </h2>

    <p>
      {stats.approvedBookings}
    </p>

  </div>

</div>

      </div>


    </AdminLayout>

  );

}

export default AdminDashboard;