const mongoose =
  require("mongoose");

const bookingSchema =
  new mongoose.Schema({

    renter: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    owner: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    car: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Car",

      required: true,

    },

    startDate: {

      type: Date,

      required: true,

    },

    endDate: {

      type: Date,

      required: true,

    },

    totalPrice: {

      type: Number,

      required: true,

    },

    status: {

      type: String,

      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
      ],

      default: "pending",

    },

  }, {

    timestamps: true,

  });

module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );