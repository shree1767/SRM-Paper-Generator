const { Schema, model } = require("mongoose");

const SubjectiveQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseOutcome: {
    type: String,
    required: true,
  },
  programOutcome: {
    type: String,
    required: true,
  },
  bloomsLevel: {
    type: String,
    required: true,
  },
});

const SubjectiveQuestion = model(
  "Subjective_Question",
  SubjectiveQuestionSchema,
);

module.exports = SubjectiveQuestion;
