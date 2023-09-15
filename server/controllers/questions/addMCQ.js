const QuestionMCQ = require("../../models/question/MCQ");

const addMCQ = async (req, res) => {
  try {
    const { question, options, answer, department, courseCode, semester } =
      req.body;

    const newQuestion = new QuestionMCQ({
      question,
      options,
      answer,
      marks: 1,
      department,
      courseCode,
      semester,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = addMCQ;
