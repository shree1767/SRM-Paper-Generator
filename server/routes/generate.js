const express = require("express");
const router = express.Router();

const ObjectiveQuestion = require("../models/question/Objective");
const SubjectiveQuestion = require("../models/question/Subjective");

const generate = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { courseCode, markScheme } = req.body;

    const { mcq, ...subjectiveMarks } = markScheme;
    const subjectiveMarksExists = Object.keys(subjectiveMarks).length > 0;

    const getSubjectiveQuestions = async (marks) => {
      const questions = await SubjectiveQuestion.aggregate([
        { $match: { courseCode, marks } },
        { $sample: { size: markScheme[marks] } },
        { $unset: { _id: 0, question: 1 } },
      ]);
      if (questions.length < markScheme[marks]) {
        throw new Error(`Not enough ${marks} mark questions`);
      }
      return questions;
    };

    const getObjectiveQuestions = async (marks) => {
      const questions = await ObjectiveQuestion.aggregate([
        { $match: { courseCode } },
        { $sample: { size: mcq } },
        {
          $project: {
            _id: 0,
            question: 1,
            options: 1,
          },
        },
      ]);
      if (questions.length < markScheme[marks]) {
        throw new Error(`Not enough ${marks} mark questions`);
      }
      return questions;
    };

    const [objective, subjective] = await Promise.all([
      getObjectiveQuestions(mcq),
      subjectiveMarksExists &&
        Object.keys(subjectiveMarks).map((marks) =>
          getSubjectiveQuestions(marks),
        ),
    ]);

    const response = { objective };
    if (subjectiveMarksExists) response.subjective = subjective;

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

router.post("/", generate);

module.exports = router;
