const SubjectiveQuestion = require("../../models/question/Subjective");

const addSubjective = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { question, answer, marks, department, courseCode } = req.body;

    const newQuestion = new SubjectiveQuestion({
      question,
      answer,
      marks,
      department,
      courseCode,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = addSubjective;
