const { StatusCodes } = require("http-status-codes");

const {
  getCourseService,
  getSingleCourseService,
  addCourseService,
  putCourseService,
  patchCourseTitleService,
  patchCourseImageService,
  deleteCourseService,
} = require("./course.services");

const getCourseController = async (req, res) => {
  try {
    const courses = await getCourseService();

    return res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSingleCourseController = async (req, res) => {
  const { code } = req.params;
  try {
    const courses = getSingleCourseService(code);

    return res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const addCourseController = async (req, res) => {
  try {
    const { code, title } = req.body;
    // const imageFile = req.file;

    if (!code || !title )
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: "Missing required fields",
      };

    const course = await addCourseService({ code, title});

    return res.status(StatusCodes.CREATED).json(course);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const putCourseController = async (req, res) => {
  try {
    const { code } = req.params;
    const { title } = req.body;
    const imageFile = req.file;

    if (!code || !title || !imageFile)
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: "Missing required fields",
      };

    const course = await putCourseService({ code, title, imageFile });

    return res.status(StatusCodes.CREATED).json(course);
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const patchCourseController = async (req, res) => {
  try {
    const { code } = req.params;
    const { field } = req.query;
    if (!code || !field)
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: "Missing required fields",
      };

    if (field === "title") {
      const { title } = req.body;
      if (!title)
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: "Missing required fields",
        };

      const course = await patchCourseTitleService({ code, title });

      return res.status(StatusCodes.OK).json(course);
    }

    if (field === "image") {
      const imageFile = req.file;
      if (!imageFile)
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: "Missing required fields",
        };

      const course = await patchCourseImageService({ code, imageFile });

      return res.status(StatusCodes.OK).json(course);
    }
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteCourseController = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code)
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: "Missing required fields",
      };

    const course = await deleteCourseService({ code });

    return res.status(StatusCodes.OK).json({
      message: `${course.code} - ${course.title} deleted successfully`,
    });
  } catch (error) {
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getCourseController,
  getSingleCourseController,
  addCourseController,
  putCourseController,
  patchCourseController,
  deleteCourseController,
};
