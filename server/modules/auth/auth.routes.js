const express = require("express");
const authRouter = express.Router();

const passport = require("../../configs/passport.config");

const {
  authController,
  loginController,
  signupController,
  logoutController,
} = require("./auth.controllers");

authRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController,
);
authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutController,
);

module.exports = authRouter;
