import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

import DatePicker
from "react-datepicker";

import {
  useParams
} from "react-router-dom";

import Layout
from "../components/Layout";

import "../styles/carDetails.css";

function CarDetails() {

  const { id } =
    useParams();

  const [car, setCar] =
    useState(null);

  const [bookedDates,
    setBookedDates] =
    useState([]);

  const [startDate,
    setStartDate] =
    useState(null);

  const [endDate,
    setEndDate] =
    useState(null);

  useEffect(() => {

    fetchCar();

    fetchBookedDates();

  }, []);

  const fetchCar =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/cars/${id}`

          );

        setCar(
          response.data.car
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchBookedDates =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/bookings/car/${id}`

          );

        const disabledDates =
          [];

        response.data.bookings
          .forEach((booking) => {

            let current =
              new Date(
                booking.startDate
              );

            const end =
              new Date(
                booking.endDate
              );

            while (
              current <= end
            ) {

              disabledDates.push(
                new Date(current)
              );

              current.setDate(
                current.getDate() + 1
              );

            }

          });

        setBookedDates(
          disabledDates
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleBooking =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/bookings",

          {

            carId: id,

            startDate,

            endDate,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        alert(
          "Booking request sent"
        );

      } catch (error) {

        alert(

          error.response?.data
            ?.message

        );

      }

    };

  if (!car)
    return <h1>Loading...</h1>;

  return (

    <Layout>

      <div className="car-details">

        <img
          src={car.image}
          alt={car.carName}
        />

        <div className="car-content">

          <h1>
            {car.carName}
          </h1>

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

          <h2>
            ₹
            {
              car.pricePerDay
            }
            /day
          </h2>

          <div className="booking-box">

            <h3>
              Book This Car
            </h3>

            <DatePicker
              selected={startDate}
              onChange={(date) =>
                setStartDate(date)
              }
              excludeDates={
                bookedDates
              }
              placeholderText="Start Date"
              className="date-picker"
            />

            <DatePicker
              selected={endDate}
              onChange={(date) =>
                setEndDate(date)
              }
              excludeDates={
                bookedDates
              }
              placeholderText="End Date"
              className="date-picker"
            />

            <button
              onClick={
                handleBooking
              }
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default
CarDetails;