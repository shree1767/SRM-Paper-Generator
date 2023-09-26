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

const getObjectiveQuestionService = async () => {
  const questions = await ObjectiveQuestion.find();

  if (!questions.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No questions found" };

  return questions;
};

const addObjectiveQuestionService = async ({
  question,
  options,
  courseCode,
  courseOutcome,
  programOutcome,
  bloomsLevel,
  imageFile,
}) => {
  try {
    const objectId = new mongoose.Types.ObjectId();
    const fileName = objectId.toString() + ".";
    if (imageFile) imageFile.originalname.split(".").pop().toLowerCase();

    let image = null;

    if (imageFile) {
      console.log("hello");
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/objective/${courseCode}/${fileName}`,
      );

      await uploadBytes(imagesRef, imageFile.buffer);
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new ObjectiveQuestion({
      _id: objectId,
      question,
      options,
      image,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
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
  courseCode,
  courseOutcome,
  programOutcome,
  bloomsLevel,
  imageFile,
}) => {
  try {
    const objectId = new mongoose.Types.ObjectId();
    const fileName = objectId.toString() + ".";
    if (imageFile) imageFile.originalname.split(".").pop().toLowerCase();

    let image = null;

    if (imageFile) {
      console.log("hello");
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/subjective/${courseCode}/${fileName}`,
      );

      await uploadBytes(imagesRef, imageFile.buffer);
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new SubjectiveQuestion({
      _id: objectId,
      question,
      marks,
      image,
      courseCode,
      courseOutcome,
      programOutcome,
      bloomsLevel,
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
