const express = require("express");
const multer = require("multer");

const courseRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
  getCourseController,
  getSingleCourseController,
  addCourseController,
  putCourseController,
  patchCourseController,
  deleteCourseController,
} = require("./course.controllers");

courseRouter.get("/", getCourseController);
courseRouter.get("/:code", getSingleCourseController);
courseRouter.post("/", upload.single("image"), addCourseController);
courseRouter.put("/:code", upload.single("image"), putCourseController);
courseRouter.patch("/:code", upload.single("image"), patchCourseController);
courseRouter.delete("/:code", deleteCourseController);
// courseRouter.get("/?code");
// courseRouter.post("/", upload.single("image"));
// courseRouter.put("/?code", upload.single("image"));
// courseRouter.patch("/?code&?field", upload.single("image"));
// courseRouter.delete("/?id");

module.exports = courseRouter;
