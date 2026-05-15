const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  registerUser,
  loginUser,

} =
require("../controllers/authController");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/owner-only",
  authMiddleware,
  roleMiddleware("owner"),
  (req, res) => {

    res.json({
      message:
        "Welcome Owner",
    });

  }
); 

module.exports = router;