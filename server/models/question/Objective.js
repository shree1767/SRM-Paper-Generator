const { Schema, model } = require("mongoose");

const ObjectiveQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    validate: {
      validator: function (value) {
        return this.options.includes(value);
      },
      message: "Answer must be one of the options",
    },
    required: true,
  },
  department: {
    type: String,
    enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL"],
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
});

const ObjectiveQuestion = model("Objective_Question", ObjectiveQuestionSchema);

module.exports = ObjectiveQuestion;
