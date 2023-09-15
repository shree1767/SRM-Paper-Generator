const QuestionsMCQ = require("../../models/question/MCQ");

const getMCQ = async (req, res) => {
  try {
    const questions = await QuestionsMCQ.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = getMCQ;
