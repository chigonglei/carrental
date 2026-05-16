import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

import Layout
from "../../components/Layout";

import "../../styles/bookings.css";

function Bookings() {

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

            "http://localhost:5000/api/bookings/owner-bookings",

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

  const updateStatus =
    async (
      bookingId,
      status
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/bookings/${bookingId}`,

          { status },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchBookings();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="bookings-page">

        <div className="bookings-header">

          <h1>
            Booking Requests
          </h1>

          <p>
            Manage renter booking
            requests
          </p>

        </div>

        <div className="bookings-grid">

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
                      booking.car?.image ||
                      "https://via.placeholder.com/400x250?text=Car+Deleted"
                    }
                    alt={
                      booking.car?.carName ||
                      "Deleted Car"
                    }
                  />

                  <div className="booking-info">

                    <h2>
                      {
                        booking.car?.carName ||
                        "Car Deleted"
                      }
                    </h2>

                    <p>
                      👤
                      {" "}
                      {
                        booking.renter
                          ?.fullName
                      }
                    </p>

                    <p>
                      📧
                      {" "}
                      {
                        booking.renter
                          ?.email
                      }
                    </p>

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

                    {

                      booking.status ===
                      "pending" && (

                        <div className="booking-actions">

                          <button
                            className="approve-btn"
                            onClick={() =>
                              updateStatus(
                                booking._id,
                                "approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              updateStatus(
                                booking._id,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </button>

                        </div>

                      )

                    }

                  </div>

                </div>

              ))

            ) : (

              <div
                className="empty-box"
              >

                <h2>
                  No Booking Requests
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
Bookings;