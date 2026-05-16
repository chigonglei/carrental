const Booking =
  require("../models/Booking");

const Car =
  require("../models/Car");


  
/* Create Booking */


exports.createBooking =
  async (req, res) => {

    try {

      

      const {

        carId,
        startDate,
        endDate,

      } = req.body;

      // Find car

      const car =
        await Car.findById(
          carId
        );

      if (!car) {

        return res.status(404)
          .json({
            message:
              "Car not found",
          });

      }

      const existingBooking =
  await Booking.findOne({

    car: carId,

    status: {
      $in: [
        "pending",
        "approved",
      ],
    },

    $or: [

      {

        startDate: {
          $lte: endDate,
        },

        endDate: {
          $gte: startDate,
        },

      },

    ],

  });

if (existingBooking) {

  return res.status(400)
    .json({

      message:
        "Car already booked for selected dates",

    });

}

      // Calculate days

      const start =
        new Date(startDate);

      const end =
        new Date(endDate);

      const diffTime =
        Math.abs(
          end - start
        );

      const totalDays =
        Math.ceil(
          diffTime /
          (1000 * 60 * 60 * 24)
        );

      // Total price

      const totalPrice =
        totalDays *
        car.pricePerDay;

      // Create booking

      const booking =
        await Booking.create({

          renter:
            req.user.id,

          owner:
            car.owner,

          car:
            car._id,

          startDate,

          endDate,

          totalPrice,

        });

      res.status(201).json({

        success: true,

        message:
          "Booking created successfully",

        booking,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

/* Renter Bookings */

exports.getRenterBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          renter:
            req.user.id,

        })
        .populate("car");

      res.status(200).json({

        success: true,

        bookings,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

/* Owner Bookings */

exports.getOwnerBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          owner:
            req.user.id,

        })
        .populate("car")
        .populate(
          "renter",
          "fullName email"
        );

      res.status(200).json({

        success: true,

        bookings,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


exports.updateBookingStatus =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      // Owner security

      if (
        booking.owner.toString() !==
        req.user.id
      ) {

        return res.status(403)
          .json({
            message:
              "Unauthorized",
          });

      }

      booking.status =
        req.body.status;

      await booking.save();

      res.status(200).json({

        success: true,

        message:
          "Booking updated",

        booking,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

exports.getCarBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          car: req.params.carId,

          status: {
            $in: [
              "pending",
              "approved",
            ],
          },

        });

      res.status(200).json({

        success: true,

        bookings,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };