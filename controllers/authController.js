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

      // Prevent admin registration

      if (
        req.body.role === "admin"
      ) {

        return res.status(403)
          .json({
            message:
              "Admin registration not allowed",
          });

      }

      // Check existing user

      const existingUser =
        await User.findOne({
          email:
            req.body.email,
        });

      if (existingUser) {

        return res.status(400)
          .json({
            message:
              "User already exists",
          });

      }

      // Hash password

      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      // Create user

      const user =
        await User.create({

          ...req.body,

          password:
            hashedPassword,

          role:
            req.body.role ||
            "renter",

        });

      // Create token

      const token =
        jwt.sign({

          id: user._id,

          role: user.role,

        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        });

      // Response

      res.status(201).json({

        success: true,

        message:
          "Account created successfully",

        token,

        user: {

          id: user._id,

          fullName:
            user.fullName,

          email:
            user.email,

          role:
            user.role,

        },

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

      // Find user

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

      // Compare password

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

      // Generate token

      const token =
        jwt.sign({

          id: user._id,

          role: user.role,

        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        });

      // Response

      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        user: {

          id: user._id,

          fullName:
            user.fullName,

          email:
            user.email,

          role:
            user.role,

        },

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };