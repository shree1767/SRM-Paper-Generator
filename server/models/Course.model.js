const { Schema, model, models } = require("mongoose");

const CourseSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: false,
  },
});

const Course = models.Course || model("Course", CourseSchema);

module.exports = Course;
