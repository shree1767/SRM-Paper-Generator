const { StatusCodes } = require("http-status-codes");

const {
  getObjectiveQuestionService,
  addObjectiveQuestionService,
  getSubjectiveQuestionService,
  addSubjectiveQuestionService,
} = require("./question.services");

const getObjectiveQuestionController = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  try {
    const questions = await getObjectiveQuestionService();
    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const addObjectiveQuestionController = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  try {
    const {
      question,
      options,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
    } = req.body;
    const imageFile = req.file;

    if (
      !question ||
      !options ||
      !courseCode ||
      !courseOutcome ||
      !programOutcome ||
      !bloomsLevel
    )
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing fields" };

    const newQuestion = await addObjectiveQuestionService({
      question,
      options,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      imageFile,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSubjectiveQuestionController = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  try {
    const questions = await getSubjectiveQuestionService();
    res.status(200).json(questions);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const addSubjectiveQuestionController = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  try {
    const {
      question,
      marks,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
    } = req.body;
    const imageFile = req.file;

    if (
      !question ||
      !marks ||
      !courseCode ||
      !courseOutcome ||
      !programOutcome ||
      !bloomsLevel
    )
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing fields" };

    const newQuestion = await addSubjectiveQuestionService({
      question,
      marks,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      imageFile,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getObjectiveQuestionController,
  addObjectiveQuestionController,
  getSubjectiveQuestionController,
  addSubjectiveQuestionController,
};
