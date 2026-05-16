import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

import {
  Link
} from "react-router-dom";

import Layout
from "../../components/Layout";

import "../../styles/myCars.css";

function MyCars() {

  const [cars, setCars] =
    useState([]);

  useEffect(() => {

    fetchCars();

  }, []);

  const fetchCars =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/cars/my-cars",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        setCars(
          response.data.cars
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this car?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/cars/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchCars();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="mycars-page">

        <div className="mycars-header">

          <h1>
            My Cars
          </h1>

          <p>
            Manage your uploaded
            vehicles
          </p>

        </div>

        <div className="mycars-grid">

          {

            cars &&
            cars.length > 0 ? (

              cars.map((car) => (

                <div
                  className="mycar-card"
                  key={car._id}
                >

                  <img
                    src={car.image}
                    alt={car.carName}
                  />

                  <div className="mycar-info">

                    <h2>
                      {car.carName}
                    </h2>

                    <p>
                      {car.brand}
                    </p>

                    <p>
                      🚘
                      {" "}
                      {car.carNumber}
                    </p>

                    <p>
                      ⛽
                      {" "}
                      {car.fuelType}
                    </p>

                    <p>
                      ⚙️
                      {" "}
                      {
                        car.transmission
                      }
                    </p>

                    <h3>
                      ₹
                      {
                        car.pricePerDay
                      }
                      /day
                    </h3>

                    <Link
                      to={`/owner/edit-car/${car._id}`}
                    >

                      <button
                        className="edit-btn"
                      >
                        Edit Car
                      </button>

                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          car._id
                        )
                      }
                    >
                      Delete Car
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="empty-box">

                <h2>
                  No Cars Found
                </h2>

                <p>
                  Add your first car
                  to start renting.
                </p>

              </div>

            )

          }

        </div>

      </div>

    </Layout>

  );

}

export default
MyCars;