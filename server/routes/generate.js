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

    const { courseCode, markScheme } = req.query;

    const { mcq, ...subjectiveMarks } = markScheme;

    const getSubjectiveQuestions = async (marks) => {
      const questions = await SubjectiveQuestion.aggregate([
        { $match: { courseCode, marks } },
        { $sample: { size: markScheme[marks] } },
        { $project: { _id: 0, department: 0, courseCode: 0 } },
      ]);
      if (questions.length < markScheme[marks]) {
        throw new Error(`Not enough ${marks} mark questions`);
      }
      return questions;
    };

    const [objective, subjectiveArray] = await Promise.all([
      ObjectiveQuestion.aggregate([
        { $match: { courseCode } },
        { $sample: { size: mcq } },
        { $project: { _id: 0, answer: 0, department: 0, courseCode: 0 } },
      ]),
      Promise.all(
        Object.keys(subjectiveMarks).map((marks) =>
          getSubjectiveQuestions(marks),
        ),
      ),
    ]);

    const subjective = {};
    Object.keys(subjectiveMarks).forEach((marks, index) => {
      subjective[marks] = subjectiveArray[index];
    });

    return res.status(200).json({ objective, subjective });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

router.get("/", generate);

module.exports = router;
