const express = require("express");
const multer = require("multer");

const questionRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
  getObjectiveQuestionController,
  addObjectiveQuestionController,
  getSubjectiveQuestionController,
  addSubjectiveQuestionController,
} = require("./question.controllers");

questionRouter.get("/objective", getObjectiveQuestionController);
questionRouter.post(
  "/objective",
  upload.single("image"),
  addObjectiveQuestionController,
);
questionRouter.get("/subjective", getSubjectiveQuestionController);
questionRouter.post(
  "/subjective",
  upload.single("image"),
  addSubjectiveQuestionController,
);

module.exports = questionRouter;
