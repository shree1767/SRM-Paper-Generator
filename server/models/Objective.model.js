const { Schema, model, models } = require("mongoose");

const ObjectiveQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
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

const ObjectiveQuestion =
  models.Objective_Question ||
  model("Objective_Question", ObjectiveQuestionSchema);

module.exports = ObjectiveQuestion;

// answer: {
//   type: String,
//   validate: {
//     validator: function (value) {
//       return this.options.includes(value);
//     },
//     message: "Answer must be one of the options",
//   },
//   required: true,
// },
