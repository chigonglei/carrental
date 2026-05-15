const express =
  require("express");

const router =
  express.Router();

const {

  addCar,
  getOwnerCars,
  getAllCars,

} =
require(
  "../controllers/carController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );

/* Owner Add Car */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("owner"),
  addCar
);

/* Owner Cars */

router.get(
  "/my-cars",
  authMiddleware,
  roleMiddleware("owner"),
  getOwnerCars
);

/* Public Cars */

router.get(
  "/",
  getAllCars
);

module.exports =
  router;