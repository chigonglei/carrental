const express =
  require("express");

const router =
  express.Router();

const {

  createBooking,
  getRenterBookings,
  getOwnerBookings,
  updateBookingStatus,
  getCarBookings,

} =
require(
  "../controllers/bookingController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );

/* Create Booking */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("renter"),
  createBooking
);

/* Renter Bookings */

router.get(
  "/my-bookings",
  authMiddleware,
  roleMiddleware("renter"),
  getRenterBookings
);

/* Owner Booking Requests */

router.get(
  "/owner-bookings",
  authMiddleware,
  roleMiddleware("owner"),
  getOwnerBookings
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("owner"),
  updateBookingStatus
);

router.get(
  "/car/:carId",
  getCarBookings
);
 
module.exports =
  router;