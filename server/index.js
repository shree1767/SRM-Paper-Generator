// Imports
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport.config");
const cors = require("cors");

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");

app.use("/auth", authRoutes);
app.use("/question", questionRoutes);

// MongoDB Config and server start
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error(error);
  });
