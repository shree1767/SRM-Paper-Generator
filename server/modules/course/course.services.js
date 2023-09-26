const { StatusCodes } = require("http-status-codes");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
  deleteObject,
} = require("firebase/storage");

const { firebaseApp } = require("../../configs/firebase.config");
const { Course } = require("../../models");
const { optimizeImage } = require("../../utils");

const getCourseService = async () => {
  const courses = await Course.find({});

  if (!courses.length)
    throw { status: StatusCodes.NOT_FOUND, message: "No courses found" };

  return courses;
};

const getSingleCourseService = async (code) => {
  const course = await Course.find({ code });

  if (!course.length)
    throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

  return course;
};

const addCourseService = async ({ code, title, imageFile }) => {
  try {
    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, `images/course/${code}.webp`);

    await uploadBytes(imagesRef, imageFile.buffer);
    const image = await getDownloadURL(imagesRef);

    const newCourse = new Course({
      code,
      title,
      image,
    });

    await newCourse.save();

    return newCourse;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const putCourseService = async ({ code, title, imageFile }) => {
  try {
    const course = await Course.findOne({ code });
    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, `images/course/${code}.webp`);

    await uploadBytes(imagesRef, optimizeImage(imageFile.buffer));
    const image = await getDownloadURL(imagesRef);

    course.title = title;
    course.image = image;

    await course.save();

    return course;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const patchCourseTitleService = async ({ code, title }) => {
  try {
    const course = await Course.findOne({ code });
    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    course.title = title;

    await course.save();

    return course;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const patchCourseImageService = async ({ code, imageFile }) => {
  try {
    const course = await Course.findOne({ code });
    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, `images/course/${code}.webp`);

    await uploadBytes(imagesRef, optimizeImage(imageFile.buffer));
    const image = await getDownloadURL(imagesRef);

    course.image = image;

    await course.save();

    return course;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

const deleteCourseService = async ({ code }) => {
  try {
    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, `images/course/${code}.webp`);

    await deleteObject(imagesRef);

    const course = await Course.findOneAndDelete({ code });

    if (!course)
      throw { status: StatusCodes.NOT_FOUND, message: "Course not found" };

    return course;
  } catch (error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

module.exports = {
  getCourseService,
  getSingleCourseService,
  addCourseService,
  putCourseService,
  patchCourseTitleService,
  patchCourseImageService,
  deleteCourseService,
};
