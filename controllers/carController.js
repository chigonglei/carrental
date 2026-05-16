const Car =
  require("../models/Car");

/* Add Car */

exports.addCar =
  async (req, res) => {

    try {

      const newCar =
        await Car.create({

          ...req.body,

          owner:
            req.user.id,

        });

      res.status(201).json({

        success: true,

        message:
          "Car added successfully",

        car: newCar,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

/* Get Owner Cars */

exports.getOwnerCars =
  async (req, res) => {

    try {

      const cars =
        await Car.find({

          owner:
            req.user.id,

        });

      res.status(200).json({

        success: true,

        cars,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

/* Get All Cars */

exports.getAllCars =
  async (req, res) => {

    try {

      const cars =
        await Car.find()
          .populate(
            "owner",
            "fullName email"
          );

      res.status(200).json({

        success: true,

        cars,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

exports.deleteCar =
  async (req, res) => {

    try {

      const car =
        await Car.findById(
          req.params.id
        );

      if (!car) {

        return res.status(404)
          .json({
            message:
              "Car not found",
          });

      }

      // Owner check

      if (
        car.owner.toString() !==
        req.user.id
      ) {

        return res.status(403)
          .json({
            message:
              "Unauthorized",
          });

      }

      await car.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Car deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

exports.getSingleCar =
  async (req, res) => {

    try {

      const car =
        await Car.findById(
          req.params.id
        ).populate(
          "owner",
          "fullName email"
        );

      if (!car) {

        return res.status(404)
          .json({
            message:
              "Car not found",
          });

      }

      res.status(200).json({

        success: true,

        car,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

exports.updateCar =
  async (req, res) => {

    try {

      const car =
        await Car.findById(
          req.params.id
        );

      if (!car) {

        return res.status(404)
          .json({
            message:
              "Car not found",
          });

      }

      // Security

      if (
        car.owner.toString() !==
        req.user.id
      ) {

        return res.status(403)
          .json({
            message:
              "Unauthorized",
          });

      }

      const updatedCar =
        await Car.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.status(200).json({

        success: true,

        message:
          "Car updated successfully",

        car: updatedCar,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };