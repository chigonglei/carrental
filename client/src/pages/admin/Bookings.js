import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import AdminLayout
from "../../components/AdminLayout";

import "../../styles/adminBookings.css";

function Bookings() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/admin/bookings",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setBookings(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="admin-bookings">

        <h1>
          Bookings Management
        </h1>

        <table>

          <thead>

            <tr>

              <th>
                User
              </th>

              <th>
                Car
              </th>

              <th>
                Start Date
              </th>

              <th>
                End Date
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking._id}>

                <td>
                  {booking.user?.name}
                </td>

                <td>
                  {booking.car?.name}
                </td>

                <td>
                  {
                    new Date(
                      booking.startDate
                    ).toLocaleDateString()
                  }
                </td>

                <td>
                  {
                    new Date(
                      booking.endDate
                    ).toLocaleDateString()
                  }
                </td>

                <td>
                  {booking.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}

export default Bookings;