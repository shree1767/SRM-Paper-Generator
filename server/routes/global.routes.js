const express = require("express");
const globalRouter = express.Router();

const passport = require("../configs/passport.config");
const questionRoutes = require("../modules/question/question.routes");
const authRoutes = require("../modules/auth/auth.routes");

const generateRoutes = require("./generate");

globalRouter.use("/auth", authRoutes);
globalRouter.use(
  "/question",
  passport.authenticate("jwt", { session: false }),
  questionRoutes,
);
globalRouter.use(
  "/generate",
  // passport.authenticate("jwt", { session: false }),
  generateRoutes,
);

module.exports = globalRouter;
