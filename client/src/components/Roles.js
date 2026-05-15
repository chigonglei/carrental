function Roles() {
  const roles = [
    {
      title: "Admin",
      desc: "Manage users, vehicles, bookings, and platform analytics.",
    },

    {
      title: "Car Owner",
      desc: "List your vehicles and earn income from rentals.",
    },

    {
      title: "Renter",
      desc: "Search and rent cars quickly and securely.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 60px",
        background: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "60px",
          color: "#0f172a",
        }}
      >
        Platform Roles
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {roles.map((role, index) => (
          <div
            key={index}
            style={{
              width: "320px",
              background: "#f8fafc",
              padding: "35px",
              borderRadius: "18px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                color: "#2563eb",
              }}
            >
              {role.title}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              {role.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Roles;