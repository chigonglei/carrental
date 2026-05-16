const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  approveCar,
  getAllUsers,
  getAllCars,
  getAllBookings,
  deleteUser,
  deleteCar
} = require("../controllers/adminController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  adminOnly
} = require("../middleware/roleMiddleware");

router.use(protect, adminOnly);

router.get("/dashboard", getDashboardStats);

router.get("/users", getAllUsers);

router.get("/cars", getAllCars);

router.get("/bookings", getAllBookings);

router.put(
  "/cars/:id/approve",
  approveCar
);

router.delete("/users/:id", deleteUser);

router.delete("/cars/:id", deleteCar);

module.exports = router;