import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import Layout from "../components/Layout";

import AlertBox from "../components/AlertBox";

import "../styles/auth.css";

import {
  loginUser,
} from "../services/authService";

function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",
      password: "",

    });

  const [alert, setAlert] =
    useState({

      show: false,
      message: "",
      type: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await loginUser(
            formData
          );

        localStorage.setItem(

          "token",

          response.data.token

        );

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )

        );

        setAlert({

          show: true,

          message:
            "Login successful",

          type: "success",

        });

        setTimeout(() => {

  const userRole =
    response.data.user.role;

  if (
    userRole === "admin"
  ) {

    navigate(
      "/admin/dashboard"
    );

  }

  else if (
    userRole === "owner"
  ) {

    navigate(
      "/owner/dashboard"
    );

  }

  else {

    navigate("/");

  }

}, 1500);

      } catch (error) {

        setAlert({

          show: true,

          message:
            error.response?.data?.message ||
            "Something went wrong",

          type: "error",

        });

      }

    };

  return (

    <Layout>

      {

        alert.show && (

          <AlertBox

            message={alert.message}

            type={alert.type}

            onClose={() =>
              setAlert({

                show: false,
                message: "",
                type: "",

              })
            }

          />

        )

      }

      <div className="auth-container">

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <h2>
            Welcome Back
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </Layout>

  );
}

export default Login;