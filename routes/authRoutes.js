const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  ownerOnly,
  adminOnly
} = require("../middleware/roleMiddleware");

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
  ownerOnly,
  (req, res) => {

    res.json({
      message:
        "Welcome Owner",
    });

  }
);

router.get(
  "/admin-only",
  authMiddleware,
  adminOnly,
  (req, res) => {

    res.json({
      message:
        "Welcome Admin",
    });

  }
);

module.exports = router;