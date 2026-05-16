import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

import Layout
from "../components/Layout";

import "../styles/myBookings.css";

function MyBookings() {

  const [bookings,
    setBookings] =
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

        const response =
          await axios.get(

            "http://localhost:5000/api/bookings/my-bookings",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        setBookings(
          response.data.bookings
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="mybookings-page">

        <div className="mybookings-header">

          <h1>
            My Bookings
          </h1>

          <p>
            View your rental
            history and booking
            status
          </p>

        </div>

        <div className="mybookings-grid">

          {

            bookings &&
            bookings.length > 0 ? (

              bookings.map(
                (booking) => (

                <div
                  className="booking-card"
                  key={booking._id}
                >

                  <img
                    src={
                      booking.car.image
                    }
                    alt={
                      booking.car.carName
                    }
                  />

                  <div className="booking-info">

                    <h2>
                      {
                        booking.car
                          .carName
                      }
                    </h2>

                    <p>
                      📅
                      {" "}
                      {
                        new Date(
                          booking.startDate
                        )
                        .toLocaleDateString()
                      }
                      {" "}
                      -
                      {" "}
                      {
                        new Date(
                          booking.endDate
                        )
                        .toLocaleDateString()
                      }
                    </p>

                    <h3>
                      ₹
                      {
                        booking.totalPrice
                      }
                    </h3>

                    <span
                      className={`status ${booking.status}`}
                    >

                      {
                        booking.status
                      }

                    </span>

                  </div>

                </div>

              ))

            ) : (

              <div
                className="empty-box"
              >

                <h2>
                  No Bookings Yet
                </h2>

              </div>

            )

          }

        </div>

      </div>

    </Layout>

  );

}

export default
MyBookings;