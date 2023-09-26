const { Schema, model, models } = require("mongoose");

const Course = require("./Course.model");

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

ObjectiveQuestionSchema.pre("save", async (next) => {
  try {
    const course = await Course.findOne({ code: this.courseCode });
    if (!course) throw new Error("Course not found");
    this.course = course._id;
    next();
  } catch (error) {
    next(error);
  }
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
