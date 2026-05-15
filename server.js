const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Car Rental API Running...");
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/cars",
  carRoutes
);
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});