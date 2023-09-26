const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../models");

const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user)
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: "User does not exist",
    };

  if (!bcrypt.compareSync(password, user.password))
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: "Invalid credentials",
    };

  if (!user.approved)
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: "User has not been approved by admin",
    };

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { token, user };
};

const signupService = async ({
  name,
  email,
  password,
  department,
  designation,
  employeeId,
}) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser)
    throw { status: StatusCodes.BAD_REQUEST, message: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    department,
    designation,
    employeeId,
  });

  const user = await newUser.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { token, user };
};

module.exports = { loginService, signupService };
