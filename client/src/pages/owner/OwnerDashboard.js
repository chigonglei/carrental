import Layout
from "../../components/Layout";

import {
  Link
} from "react-router-dom";

function OwnerDashboard() {

  return (

    <Layout>

      <div
        style={{
          padding: "40px",
        }}
      >

        <h1>
          Owner Dashboard
        </h1>

        <p>
          Welcome Car Owner
        </p>

        <Link
          to="/owner/add-car"
          style={{

            display: "inline-block",

            marginTop: "20px",

            padding:
              "12px 20px",

            background:
              "#2563eb",

            color: "white",

            textDecoration:
              "none",

            borderRadius: "10px",

            fontWeight: "600",

          }}
        >
          Add New Car
        </Link>

      </div>

    </Layout>

  );

}

export default
OwnerDashboard;