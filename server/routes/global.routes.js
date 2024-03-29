const express = require("express");
const globalRouter = express.Router();

const passport = require("../configs/passport.config");
const authRoutes = require("../modules/auth/auth.routes");
const questionRoutes = require("../modules/question/question.routes");
const adminRoutes = require("../modules/admin/admin.routes");
const courseRoutes = require("../modules/course/course.routes");

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
globalRouter.use("/admin", adminRoutes);
globalRouter.use(
  "/course",
  passport.authenticate("jwt", { session: false }),
  courseRoutes,
);

module.exports = globalRouter;
