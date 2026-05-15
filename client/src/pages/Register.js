import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import Layout from "../components/Layout";

import AlertBox from "../components/AlertBox";

import "../styles/auth.css";

import {
  registerUser,
} from "../services/authService";

function Register() {

  const navigate =
    useNavigate();

  const [role, setRole] =
    useState("renter");

  const [alert, setAlert] =
    useState({

      show: false,
      message: "",
      type: "",

    });

  const [formData, setFormData] =
    useState({

      // Common

      fullName: "",
      email: "",
      phone: "",

      password: "",
      confirmPassword: "",

      address: "",
      city: "",
      state: "",
      pincode: "",

      // Renter

      licenseNumber: "",
      aadhaarNumber: "",
      dob: "",
      emergencyContact: "",

      // Owner

      businessName: "",
      vehicleOwnerName: "",
      carNumber: "",
      chassisNumber: "",
      rcNumber: "",
      garageLocation: "",
      fleetSize: "",

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

      // Password Match

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setAlert({

          show: true,

          message:
            "Passwords do not match",

          type: "error",

        });

        return;
      }

      try {

        const response =
          await registerUser({

            role,
            ...formData,

          });

        setAlert({

          show: true,

          message:
            response.data.message,

          type: "success",

        });

        setTimeout(() => {

          navigate("/login");

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
            Create Account
          </h2>

          {/* Account Type */}

          <div className="form-section">

            <h3>
              Account Type
            </h3>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >

              <option value="renter">
                Renter
              </option>

              <option value="owner">
                Car Owner
              </option>

            </select>

          </div>

          {/* Basic */}

          <div className="form-section">

            <h3>
              Basic Information
            </h3>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

          </div>

          {/* Renter */}

          {

            role === "renter" && (

              <div className="form-section">

                <h3>
                  Verification Details
                </h3>

                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Driving License Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="emergencyContact"
                  placeholder="Emergency Contact (Optional)"
                  onChange={handleChange}
                />

              </div>

            )

          }

          {/* Owner */}

          {

            role === "owner" && (

              <div className="form-section">

                <h3>
                  Owner Details
                </h3>

                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name (Optional)"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="vehicleOwnerName"
                  placeholder="Vehicle Owner Name"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="carNumber"
                  placeholder="Car Registration Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="chassisNumber"
                  placeholder="Chassis Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="rcNumber"
                  placeholder="RC Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Driving License Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="garageLocation"
                  placeholder="Garage Location"
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="fleetSize"
                  placeholder="Fleet Size"
                  onChange={handleChange}
                />

              </div>

            )

          }

          {/* Address */}

          <div className="form-section">

            <h3>
              Address Details
            </h3>

            <textarea
              name="address"
              placeholder="Full Address"
              rows="3"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

      </div>

    </Layout>

  );
}

export default Register;