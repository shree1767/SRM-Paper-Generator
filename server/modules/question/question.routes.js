const express = require("express");
const multer = require("multer");

const questionRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
  getObjectiveQuestionController,
  getSingleObjectiveQuestionController,
  addObjectiveQuestionController,
  deleteObjectiveQuestionController,
  getSubjectiveQuestionController,
  getSingleSubjectiveQuestionController,
  addSubjectiveQuestionController,
  deleteSubjectiveQuestionController,
} = require("./question.controllers");

questionRouter.get("/objective", getObjectiveQuestionController);
questionRouter.get("/objective/:id", getSingleObjectiveQuestionController);
questionRouter.post(
  "/objective",
  upload.single("image"),
  addObjectiveQuestionController,
);
questionRouter.delete("/objective/:id", deleteObjectiveQuestionController);

questionRouter.get("/subjective", getSubjectiveQuestionController);
questionRouter.get("/subjective/:id", getSingleSubjectiveQuestionController);
questionRouter.post(
  "/subjective",
  upload.single("image"),
  addSubjectiveQuestionController,
);
questionRouter.delete("/subjective/:id", deleteSubjectiveQuestionController);

module.exports = questionRouter;
