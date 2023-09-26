const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");

const { firebaseApp } = require("../../configs/firebase.config");
const { ObjectiveQuestion, SubjectiveQuestion } = require("../../models");
const { optimizeImage } = require("../../utils");

const getObjectiveQuestionService = async () => {
  const questions = await ObjectiveQuestion.find();

  if (!questions.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No questions found" };

  return questions;
};

const addObjectiveQuestionService = async ({
  question,
  options,
  imageFile,
  courseCode,
  unit,
  courseOutcome,
  programOutcome,
  bloomsLevel,
  piCode,
}) => {
  try {
    const objectId = new mongoose.Types.ObjectId();

    let image = null;

    if (imageFile) {
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/objective/${courseCode}/${objectId}.webp`,
      );

      await uploadBytes(imagesRef, optimizeImage(imageFile.buffer));
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new ObjectiveQuestion({
      _id: objectId,
      question,
      options,
      image,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
    });

    await newQuestion.save();

    return newQuestion;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const getSubjectiveQuestionService = async () => {
  const questions = await SubjectiveQuestion.find();

  if (!questions.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No questions found" };

  return questions;
};

const addSubjectiveQuestionService = async ({
  question,
  marks,
  imageFile,
  courseCode,
  unit,
  courseOutcome,
  programOutcome,
  bloomsLevel,
  piCode,
}) => {
  try {
    const objectId = new mongoose.Types.ObjectId();

    let image = null;

    if (imageFile) {
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/subjective/${courseCode}/${objectId}.webp`,
      );

      await uploadBytes(imagesRef, optimizeImage(imageFile.buffer));
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new SubjectiveQuestion({
      _id: objectId,
      question,
      marks,
      image,
      courseCode,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
    });

    await newQuestion.save();

    return newQuestion;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

module.exports = {
  getObjectiveQuestionService,
  addObjectiveQuestionService,
  getSubjectiveQuestionService,
  addSubjectiveQuestionService,
};
