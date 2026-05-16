const express =
  require("express");

const router =
  express.Router();

const {

  addCar,
  getOwnerCars,
  getAllCars,
  deleteCar,
  getSingleCar,
  updateCar,

} =
require(
  "../controllers/carController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  ownerOnly,
  adminOnly
} =
require(
  "../middleware/roleMiddleware"
);

/* Owner Add Car */

router.post(
  "/",
  authMiddleware,
  ownerOnly,
  addCar
);

/* Owner Cars */

router.get(
  "/my-cars",
  authMiddleware,
  ownerOnly,
  getOwnerCars
);

/* Single Car */

router.get(
  "/:id",
  getSingleCar
);

/* Public Cars */

router.get(
  "/",
  getAllCars
);

router.put(
  "/:id",
  authMiddleware,
  ownerOnly,
  updateCar
);

/* Delete Car */

router.delete(
  "/:id",
  authMiddleware,
  ownerOnly,
  deleteCar
);

module.exports =
  router;