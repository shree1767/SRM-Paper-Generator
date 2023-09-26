// Imports
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const passport = require("./configs/passport.config");
const { initializeFirebase } = require("./configs/firebase.config");
const { connectToDb } = require("./configs/database.config");

// Initialize express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

// Routes
const globalRouter = require("./routes/global.routes");

app.use("/", globalRouter);

// MongoDB Config and server start
connectToDb();
initializeFirebase();
app.listen(port, () => console.log(`Server running on port ${port}`));
