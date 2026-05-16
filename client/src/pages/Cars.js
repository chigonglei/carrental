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
from "../components/Layout";

import "../styles/cars.css";

function Cars() {

  const [cars, setCars] =
    useState([]);

  useEffect(() => {

    fetchCars();

  }, []);

  const fetchCars =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/cars"
          );

        setCars(
          response.data.cars
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="cars-page">

        <div className="cars-header">

          <h1>
            Explore Cars
          </h1>

          <p>
            Choose from our
            premium collection
            of vehicles.
          </p>

        </div>

        <div className="cars-grid">

          {

            cars &&
            cars.length > 0 ? (

              cars.map((car) => (

                <div
                  className="car-card"
                  key={car._id}
                >

                  <img
                    src={car.image}
                    alt={car.carName}
                  />

                  <div className="car-info">

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
                      to={`/cars/${car._id}`}
                    >

                      <button>
                        Rent Now
                      </button>

                    </Link>

                  </div>

                </div>

              ))

            ) : (

              <h2>
                No Cars Available
              </h2>

            )

          }

        </div>

      </div>

    </Layout>

  );

}

export default Cars;