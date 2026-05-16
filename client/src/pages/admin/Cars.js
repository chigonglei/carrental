import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import AdminLayout
from "../../components/AdminLayout";

import "../../styles/adminCars.css";

function Cars() {

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

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/cars",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setCars(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  const approveCar =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/admin/cars/${id}/approve`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchCars();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteCar =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this car?"
        );

      if (!confirmDelete) {

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5000/api/admin/cars/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchCars();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="admin-cars">

        <h1>
          Cars Management
        </h1>

        <table>

          <thead>

            <tr>

              <th>
                Car
              </th>

              <th>
                Brand
              </th>

              <th>
                Price
              </th>

              <th>
                Owner
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {cars.map((car) => (

              <tr key={car._id}>

                <td>
                  {car.carName}
                </td>

                <td>
                  {car.brand}
                </td>

                <td>
                  ₹{car.pricePerDay}
                </td>

                <td>
                  {car.owner?.fullName}
                </td>

                <td>

                  <span
                    className={`status ${car.status}`}
                  >
                    {car.status}
                  </span>

                </td>

                <td>

                  {car.status ===
                  "pending" && (

                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveCar(
                          car._id
                        )
                      }
                    >
                      Approve
                    </button>

                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteCar(
                        car._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}

export default Cars;