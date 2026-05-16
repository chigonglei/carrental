const mongoose =
  require("mongoose");

const carSchema =
  new mongoose.Schema({

    owner: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    carName: {

      type: String,

      required: true,

    },

    brand: {

      type: String,

      required: true,

    },

    carNumber: {

      type: String,

      required: true,

      unique: true,

    },

    fuelType: {

      type: String,

      required: true,

    },

    transmission: {

      type: String,

      enum: [
        "manual",
        "automatic",
      ],

      required: true,

    },

    pricePerDay: {

      type: Number,

      required: true,

    },

    image: {

      type: String,

      required: true,

    },

    available: {

      type: Boolean,

      default: true,

    },

  }, {

    timestamps: true,

  });

module.exports =
  mongoose.model(
    "Car",
    carSchema
  );