const { StatusCodes } = require("http-status-codes");

const {
  getObjectiveQuestionService,
  getSingleObjectiveQuestionService,
  addObjectiveQuestionService,
  deleteObjectiveQuestionService,
  getSubjectiveQuestionService,
  getSingleSubjectiveQuestionService,
  addSubjectiveQuestionService,
  deleteSubjectiveQuestionService,
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

const getSingleObjectiveQuestionController = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await getSingleObjectiveQuestionService({ id });

    res.status(StatusCodes.OK).json(question);
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
      user,
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
      !piCode ||
      !user
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
      user,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteObjectiveQuestionController = async (req, res) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    await deleteObjectiveQuestionService({ id, user });

    return res.status(StatusCodes.OK).end();
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

const getSingleSubjectiveQuestionController = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await getSingleSubjectiveQuestionService(id);

    res.status(StatusCodes.OK).json(question);
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
      user,
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
      !piCode ||
      !user
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
      user,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteSubjectiveQuestionController = async (req, res) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    await deleteSubjectiveQuestionService({ id, user });

    return res.status(StatusCodes.OK).end();
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getObjectiveQuestionController,
  getSingleObjectiveQuestionController,
  addObjectiveQuestionController,
  deleteObjectiveQuestionController,
  getSubjectiveQuestionController,
  getSingleSubjectiveQuestionController,
  addSubjectiveQuestionController,
  deleteSubjectiveQuestionController,
};
