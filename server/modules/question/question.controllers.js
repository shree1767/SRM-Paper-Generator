const { StatusCodes } = require("http-status-codes");

const {
  getObjectiveQuestionService,
  addObjectiveQuestionService,
  getSubjectiveQuestionService,
  addSubjectiveQuestionService,
} = require("./question.services");

const getObjectiveQuestionController = async (req, res) => {
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
  try {
    const {
      question,
      options,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
    } = req.body;
    const imageFile = req.file;

    if (
      !question ||
      !options ||
      !courseCode ||
      !unit ||
      !courseOutcome ||
      !programOutcome ||
      !bloomsLevel ||
      !piCode
    )
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing fields" };

    const newQuestion = await addObjectiveQuestionService({
      question,
      options,
      imageFile,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSubjectiveQuestionController = async (req, res) => {
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
  try {
    const {
      question,
      marks,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
    } = req.body;
    const imageFile = req.file;

    if (
      !question ||
      !marks ||
      !courseCode ||
      !unit ||
      !courseOutcome ||
      !programOutcome ||
      !bloomsLevel ||
      !piCode
    )
      throw { status: StatusCodes.BAD_REQUEST, message: "Missing fields" };

    const newQuestion = await addSubjectiveQuestionService({
      question,
      marks,
      imageFile,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
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
