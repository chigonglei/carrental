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