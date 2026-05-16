import {
  Link
} from "react-router-dom";

import Layout
from "../../components/Layout";

import "../../styles/ownerDashboard.css";

function OwnerDashboard() {

  return (

    <Layout>

      <div className="owner-dashboard">

        {/* Header */}

        <div className="dashboard-header">

          <div>

            <h1>
              Owner Dashboard
            </h1>

            <p>
              Manage your cars,
              bookings and earnings
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="stats-grid">

          <div className="stat-card">

            <h2>
              12
            </h2>

            <p>
              Total Cars
            </p>

          </div>

          <div className="stat-card">

            <h2>
              5
            </h2>

            <p>
              Active Bookings
            </p>

          </div>

          <div className="stat-card">

            <h2>
              ₹45,000
            </h2>

            <p>
              Earnings
            </p>

          </div>

          <div className="stat-card">

            <h2>
              8
            </h2>

            <p>
              Available Cars
            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="actions-grid">

          <Link
            to="/owner/add-car"
            className="action-card"
          >

            <h3>
              Add Car
            </h3>

            <p>
              Upload a new
              vehicle
            </p>

          </Link>

          <Link
            to="/owner/my-cars"
            className="action-card"
          >

            <h3>
              My Cars
            </h3>

            <p>
              Manage your fleet
            </p>

          </Link>

          <Link
            to="/owner/bookings"
            className="action-card"
          >

            <h3>
              Bookings
            </h3>

            <p>
              View booking
              requests
            </p>

          </Link>

        </div>

      </div>

    </Layout>

  );

}

export default
OwnerDashboard;