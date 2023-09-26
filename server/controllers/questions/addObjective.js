const ObjectiveQuestion = require("../../models/question/Objective");

const addObjective = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const {
      question,
      options,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
    } = req.body;

    const newQuestion = new ObjectiveQuestion({
      question,
      options,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = addObjective;
