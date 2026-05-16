import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Layout
from "../../components/Layout";

import "../../styles/addCar.css";

function EditCar() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      carName: "",
      brand: "",
      image: "",
      carNumber: "",
      fuelType: "",
      transmission: "",
      pricePerDay: "",

    });

  useEffect(() => {

    fetchCar();

  }, []);

  const fetchCar =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/cars/${id}`

          );

        setFormData(
          response.data.car
        );

      } catch (error) {

        console.log(error);

      }

    };

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

        await axios.put(

          `http://localhost:5000/api/cars/${id}`,

          formData,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        alert(
          "Car updated successfully"
        );

        navigate(
          "/owner/my-cars"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="add-car-page">

        <div className="add-car-container">

          <h1>
            Edit Car
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <input
              type="text"
              name="carName"
              placeholder="Car Name"
              value={
                formData.carName
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={
                formData.brand
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="carNumber"
              placeholder="Car Number"
              value={
                formData.carNumber
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="fuelType"
              placeholder="Fuel Type"
              value={
                formData.fuelType
              }
              onChange={
                handleChange
              }
            />

            <select
              name="transmission"
              value={
                formData.transmission
              }
              onChange={
                handleChange
              }
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
              value={
                formData.pricePerDay
              }
              onChange={
                handleChange
              }
            />

            <button type="submit">
              Update Car
            </button>

          </form>

        </div>

      </div>

    </Layout>

  );

}

export default
EditCar;