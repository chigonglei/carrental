const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema({

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "renter",
        "owner",
        "admin",
      ],
      required: true,
    },

    address: String,
    city: String,
    state: String,
    pincode: String,

    // Renter

    licenseNumber: String,
    aadhaarNumber: String,
    dob: String,
    emergencyContact: String,

    // Owner

    businessName: String,
    vehicleOwnerName: String,
    carNumber: String,
    chassisNumber: String,
    rcNumber: String,
    garageLocation: String,
    fleetSize: String,

  }, {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );