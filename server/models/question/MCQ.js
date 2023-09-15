const { Schema, model } = require("mongoose");

const QuestionMCQSchema = new Schema({
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
  marks: {
    type: Number,
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
  semester: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },
});

const QuestionMCQ = model("QuestionMCQ", QuestionMCQSchema);

module.exports = QuestionMCQ;
