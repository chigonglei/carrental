import Layout
from "../components/Layout";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  return (

    <Layout>

      <div
        style={{
          padding: "40px",
        }}
      >

        <h1>
          Profile
        </h1>

        <p>
          Name:
          {" "}
          {user?.fullName}
        </p>

        <p>
          Email:
          {" "}
          {user?.email}
        </p>

        <p>
          Role:
          {" "}
          {user?.role}
        </p>

      </div>

    </Layout>

  );

}

export default
Profile;