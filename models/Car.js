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

    model: {

      type: String,

      required: true,

    },

    year: {

      type: Number,

      required: true,

    },

    pricePerDay: {

      type: Number,

      required: true,

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

    seats: {

      type: Number,

      required: true,

    },

    location: {

      type: String,

      required: true,

    },

    image: {

      type: String,

      default: "",

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