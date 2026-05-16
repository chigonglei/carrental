import {
  useState
} from "react";

import axios
from "axios";

import Layout
from "../../components/Layout";

import "../../styles/addCar.css";

function AddCar() {

  const [formData,
    setFormData] =
    useState({

      carName: "",
      brand: "",
      carNumber: "",
      fuelType: "",
      transmission: "",
      pricePerDay: "",
      image: "",

    });

  const handleChange =
    (e) => {

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

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.post(

            "http://localhost:5000/api/cars",

            formData,

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        alert(
          response.data.message
        );

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      }

    };

  return (

    <Layout>

      <div className="add-car-page">

        <div className="add-car-card">

          <h1>
            Add Your Car
          </h1>

          <p>
            Upload your vehicle
            details to start
            earning.
          </p>

          <form
            className="add-car-form"
            onSubmit={
              handleSubmit
            }
          >

            <input
              type="text"
              name="carName"
              placeholder="Car Name"
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="carNumber"
              placeholder="Car Number"
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="fuelType"
              placeholder="Fuel Type"
              onChange={
                handleChange
              }
              required
            />

            <select
              name="transmission"
              onChange={
                handleChange
              }
              required
            >

              <option value="">
                Select Transmission
              </option>

              <option value="manual">
                Manual
              </option>

              <option value="automatic">
                Automatic
              </option>

            </select>

            <input
              type="number"
              name="pricePerDay"
              placeholder="Price Per Day"
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={
                handleChange
              }
              required
            />

            <button
              type="submit"
            >
              Add Car
            </button>

          </form>

        </div>

      </div>

    </Layout>

  );

}

export default AddCar;