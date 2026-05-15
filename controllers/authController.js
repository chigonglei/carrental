const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

/* Register */

exports.registerUser =
  async (req, res) => {

    try {

      const existingUser =
        await User.findOne({
          email: req.body.email,
        });

      if (existingUser) {

        return res.status(400)
          .json({
            message:
              "User already exists",
          });

      }

      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      const user =
        await User.create({

          ...req.body,

          password:
            hashedPassword,

        });

      res.status(201).json({

        success: true,

        message:
          "Account created successfully",

        user,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

/* Login */

exports.loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

  return res.status(404)
    .json({
      message:
        "Email is not registered",
    });

}

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

  return res.status(400)
    .json({
      message:
        "Incorrect password",
    });

}

      const token =
        jwt.sign({

          id: user._id,
          role: user.role,

        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        });

      res.status(200).json({

        success: true,

        token,

        user,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };