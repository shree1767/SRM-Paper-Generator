const { Schema, model, models } = require("mongoose");

const Course = require("./Course.model");

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
});

SubjectiveQuestionSchema.pre("save", async (next) => {
  try {
    const course = await Course.findOne({ code: this.courseCode });
    if (!course) throw new Error("Course not found");
    this.course = course._id;
    next();
  } catch (error) {
    next(error);
  }
});

const SubjectiveQuestion =
  models.Subjective_Question ||
  model("Subjective_Question", SubjectiveQuestionSchema);

module.exports = SubjectiveQuestion;
