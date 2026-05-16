import "../styles/adminNavbar.css";

function AdminNavbar() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  return (

    <div className="admin-navbar">

      <h3>
        Welcome,
        {" "}
        {user?.name}
      </h3>

    </div>

  );

}

export default AdminNavbar;