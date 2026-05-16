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

const {
  renterOnly,
  ownerOnly,
  adminOnly
} =
require(
  "../middleware/roleMiddleware"
);

/* Create Booking */

router.post(
  "/",
  authMiddleware,
  renterOnly,
  createBooking
);

/* Renter Bookings */

router.get(
  "/my-bookings",
  authMiddleware,
  renterOnly,
  getRenterBookings
);

/* Owner Booking Requests */

router.get(
  "/owner-bookings",
  authMiddleware,
  ownerOnly,
  getOwnerBookings
);

router.put(
  "/:id",
  authMiddleware,
  ownerOnly,
  updateBookingStatus
);

router.get(
  "/car/:carId",
  getCarBookings
);

module.exports =
  router;