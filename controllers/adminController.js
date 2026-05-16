const User =
  require("../models/User");

const Car =
  require("../models/Car");

const Booking =
  require("../models/Booking");

/* Dashboard Stats */

const getDashboardStats =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalCars =
        await Car.countDocuments();

      const totalBookings =
        await Booking.countDocuments();

      const pendingBookings =
        await Booking.countDocuments({
          status: "pending"
        });

      const approvedBookings =
        await Booking.countDocuments({
          status: "approved"
        });

      const bookings =
        await Booking.find();

      let totalRevenue = 0;

      bookings.forEach((booking) => {

        totalRevenue +=
          booking.totalPrice || 0;

      });

      res.json({

        totalUsers,
        totalCars,
        totalBookings,
        pendingBookings,
        approvedBookings,
        totalRevenue

      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

/* All Users */

const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

/* All Cars */

const getAllCars =
  async (req, res) => {

    try {

      const cars =
        await Car.find()
          .populate(
            "owner",
            "name email"
          );

      res.json(cars);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

/* All Bookings */

const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "car",
            "name brand"
          );

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

/* Delete User */

const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

/* Delete Car */

const deleteCar =
  async (req, res) => {

    try {

      await Car.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Car deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

const approveCar =
  async (req, res) => {

    try {

      const car =
        await Car.findById(
          req.params.id
        );

      if (!car) {

        return res.status(404).json({
          message:
            "Car not found"
        });

      }

      car.status =
        "approved";

      await car.save();

      res.json({

        success: true,

        message:
          "Car approved successfully"

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };


module.exports = {

  getDashboardStats,
  approveCar,
  getAllUsers,
  getAllCars,
  getAllBookings,
  deleteUser,
  deleteCar

};