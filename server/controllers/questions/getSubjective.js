const SubjectiveQuestion = require("../../models/question/Subjective");

const getSubjective = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const questions = await SubjectiveQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = getSubjective;
