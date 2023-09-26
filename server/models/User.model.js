const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["superuser", "admin", "user"],
    default: "user",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const User = model("User", UserSchema);

module.exports = User;
