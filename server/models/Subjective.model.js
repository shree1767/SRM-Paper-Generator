const { Schema, model, models } = require("mongoose");

const SubjectiveQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
  unit: {
    type: Number,
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
  piCode: {
    type: String,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SubjectiveQuestion =
  models.Subjective_Question ||
  model("Subjective_Question", SubjectiveQuestionSchema);

module.exports = SubjectiveQuestion;
