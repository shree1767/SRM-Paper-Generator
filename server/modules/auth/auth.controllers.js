const { StatusCodes } = require("http-status-codes");

const { loginService, signupService } = require("./auth.services");

const authController = async (req, res) => {
  const { user } = req;

  return res.status(StatusCodes.OK).json({
    message: "Authorized",
    user,
  });
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing Credentials" };

    const { token, user } = await loginService(email, password);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const signupController = async (req, res) => {
  try {
    const { name, email, password, department, designation, employeeId } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !designation ||
      !employeeId
    )
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing Credentials" };

    const { token, user } = await signupService({
      name,
      email,
      password,
      department,
      designation,
      employeeId,
    });

    return res.status(StatusCodes.CREATED).json({ token, user });
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const logoutController = async (req, res) => {
  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = {
  authController,
  loginController,
  signupController,
  logoutController,
};
