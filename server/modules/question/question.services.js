const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
  deleteObject,
} = require("firebase/storage");

const { firebaseApp } = require("../../configs/firebase.config");
const {
  ObjectiveQuestion,
  SubjectiveQuestion,
  Course,
} = require("../../models");
const { optimizeImage } = require("../../utils");

const getObjectiveQuestionService = async () => {
  const questions = await ObjectiveQuestion.find()
    .populate("course")
    .populate("addedBy")
    .exec();

  if (!questions.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No questions found" };

  return questions;
};

const getSingleObjectiveQuestionService = async ({ id }) => {
  const question = await ObjectiveQuestion.findById(id)
    .populate("course")
    .populate("addedBy")
    .exec();

  if (!question)
    throw { status: StatusCodes.NOT_FOUND, message: "Question not found" };

  return question;
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
  user,
}) => {
  try {
    const course = await Course.findOne({ code: courseCode });
    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    const objectId = new mongoose.Types.ObjectId();

    let image = null;

    if (imageFile) {
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/objective/${courseCode}/${objectId}.webp`,
      );

      await uploadBytes(imagesRef, await optimizeImage(imageFile.buffer));
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new ObjectiveQuestion({
      _id: objectId,
      question,
      options,
      image,
      course: course._id,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
      addedBy: user._id,
    });

    await newQuestion.save({ courseCode });

    return newQuestion;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const deleteObjectiveQuestionService = async ({ id, user }) => {
  try {
    const question = await ObjectiveQuestion.findByIdAndDelete(id)
      .populate("course")
      .exec();

    if (!question)
      throw { status: StatusCodes.NOT_FOUND, message: "Question not found" };

    if (question.addedBy !== user._id && user.role === "user")
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: "You are not authorized to delete this question",
      };

    const storage = getStorage(firebaseApp);
    const imageRef = ref(
      storage,
      `/images/objective/${question.course.code}/${id}.webp`,
    );
    const image = await getDownloadURL(imageRef);
    if (image) deleteObject(imageRef);

    return;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const getSubjectiveQuestionService = async () => {
  const questions = await SubjectiveQuestion.find()
    .populate("course")
    .populate("addedBy")
    .exec();

  if (!questions.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No questions found" };

  return questions;
};

const getSingleSubjectiveQuestionService = async ({ id }) => {
  const question = await SubjectiveQuestion.findById(id)
    .populate("course")
    .populate("addedBy")
    .exec();

  if (!question)
    throw { status: StatusCodes.NOT_FOUND, message: "Question not found" };

  return question;
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
  user,
}) => {
  try {
    const course = await Course.findOne({ code: courseCode });
    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    const objectId = new mongoose.Types.ObjectId();

    let image = null;

    if (imageFile) {
      const storage = getStorage(firebaseApp);
      const imagesRef = ref(
        storage,
        `images/subjective/${courseCode}/${objectId}.webp`,
      );

      await uploadBytes(imagesRef, await optimizeImage(imageFile.buffer));
      image = await getDownloadURL(imagesRef);
    }

    const newQuestion = new SubjectiveQuestion({
      _id: objectId,
      question,
      marks,
      image,
      course: course._id,
      unit,
      courseOutcome,
      programOutcome,
      bloomsLevel,
      piCode,
      addedBy: user._id,
    });

    await newQuestion.save();

    return newQuestion;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const deleteSubjectiveQuestionService = async ({ id, user }) => {
  try {
    const question = await SubjectiveQuestion.findByIdAndDelete(id)
      .populate("course")
      .exec();

    if (!question)
      throw { status: StatusCodes.NOT_FOUND, message: "Question not found" };

    if (question.addedBy !== user._id && user.role === "user")
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: "You are not authorized to delete this question",
      };

    const storage = getStorage(firebaseApp);
    const imageRef = ref(
      storage,
      `/images/objective/${question.course.code}/${id}.webp`,
    );
    const image = await getDownloadURL(imageRef);
    if (image) deleteObject(imageRef);

    return;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

module.exports = {
  getObjectiveQuestionService,
  getSingleObjectiveQuestionService,
  addObjectiveQuestionService,
  deleteObjectiveQuestionService,
  getSubjectiveQuestionService,
  getSingleSubjectiveQuestionService,
  addSubjectiveQuestionService,
  deleteSubjectiveQuestionService,
};
