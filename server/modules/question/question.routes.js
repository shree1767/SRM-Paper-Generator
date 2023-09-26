const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
  getObjectiveQuestionController,
  addObjectiveQuestionController,
  getSubjectiveQuestionController,
  addSubjectiveQuestionController,
} = require("./question.controllers");

router.get("/objective", getObjectiveQuestionController);
router.post(
  "/objective",
  upload.single("image"),
  addObjectiveQuestionController,
);
router.get("/subjective", getSubjectiveQuestionController);
router.post(
  "/subjective",
  upload.single("image"),
  addSubjectiveQuestionController,
);

module.exports = router;
