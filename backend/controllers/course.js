import Course from "../models/course";
import slugify from "slugify";
import Lesson from "../models/lesson";
import User from "../models/user";

export const createCourse = async (req, res, next) => {
  // try {
  const alreadyExists = await Course.findOne({
    slug: slugify(req.body.title, { lower: true }),
    instructor: req.user._id,
  });
  if (alreadyExists) {
    return res.status(400).json({
      message: "Course already exists",
    });
  }
  const course = new Course({
    slug: slugify(req.body.title, { lower: true }),
    instructor: req.user._id,
    ...req.body,
  });
  await course.save();
  res.status(200).json({
    message: "Course created successfully",
  });
};

export const viewCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.body.slug })
      .populate("instructor", "_id name")
      .exec();
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    res.status(200).json({
      message: "Course found",
      course,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching course.",
      error: e,
    });
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const image = req.file;
    res.status(200).json({
      message: "Image uploaded successfully",
      path: `${image.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading image",
      error: err,
    });
  }
};

export const removeImage = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting image.",
      error: e,
    });
  }
};

export const uploadVideo = async (req, res, next) => {
  try {
    const video = req.file;
    res.status(200).json({
      message: "Video uploaded successfully",
      path: `${video.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading Video",
      error: err,
    });
  }
};

export const removeVideo = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting Video.",
      error: e,
    });
  }
};

// export const updateLesson = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { title, content, video } = req.body;
//     console.table(req.body);
//     // check if lesson with slug exists

//     const course = await Course.findOneAndUpdate(
//       { slug },
//       {
//         $push: {
//           lessons: {
//             title,
//             content,
//             video,
//             slug: slugify(title, { lower: true }),
//           },
//         },
//       },
//       { new: true }
//     ).exec();
//     if (!course) {
//       return res.status(400).json({
//         message: "Course not found",
//       });
//     }
//     res.status(200).json({
//       message: "Lesson created successfully",
//       course,
//     });
//   } catch (e) {
//     res.status(500).json({
//       message: "Error creating lesson. 222",
//       error: e,
//     });
//   }
// };
// export const updateLesson = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { title, video, } = req.body;
//     const course = await Course.findOneAndUpdate(
//       { slug },
//       {
//         $set: {
//           content,
//         },
//       },
//       { new: true }
//     ).exec();
//     if (!course) {
//       return res.status(400).json({
//         message: "Course not found",
//       });
//     }
//     res.status(200).json({
//       message: "Lesson updated successfully",
//       course,
//     });
//   } catch (e) {
//     res.status(500).json({
//       message: "Error updating Lesson.",
//       error: e,
//     });
//   }
// };

export const updateCourse = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const {
      title,
      description,
      price,
      image,
      video,
      published = false,
    } = req.body;
    console.log(req.body);
    const course = await Course.findOneAndUpdate(
      { slug },
      {
        $set: {
          title,
          description,
          price,
          image,
          video,
          published,
        },
      },
      { new: true }
    ).exec();
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error updating course.",
      error: e,
    });
  }
};

// LESSONS

export const createLesson = async (req, res, next) => {
  // try {
  // console.log(req.body.content);
  const { slug } = req.params;
  const { title, video, content } = req.body;
  const courseContent = await Course.findOne({ slug: slug }).exec();
  if (!courseContent) {
    return res.status(400).json({
      message: "Course not found",
    });
  }
  const instructor = await User.findOne({ _id: courseContent.instructor });
  if (!instructor) {
    return res.status(400).json({
      message: "Instructor not found",
    });
  }
  const checkLessonExists = await Course.findOne({
    slug:
      instructor._id +
      "-" +
      courseContent.title +
      "-" +
      slugify(title, { lower: true }),
  }).exec();
  if (checkLessonExists) {
    // replace lesson
    const course = await Course.findOneAndUpdate(
      {
        slug:
          instructor._id +
          "-" +
          courseContent.title +
          "-" +
          slugify(title, { lower: true }),
      },
      {
        $set: {
          title,
          video,
          content,
        },
      },
      { new: true }
    ).exec();
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Lesson updated successfully",
      course,
      // courseContent,
    });
  } else {
    // create lesson
    const course = await Course.findOneAndUpdate(
      { slug },
      {
        $push: {
          lessons: {
            title,
            video,
            content,
            slug:
              instructor._id +
              "-" +
              courseContent.title +
              "-" +
              slugify(title, { lower: true }),
          },
        },
      },
      { new: true }
    ).exec();
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Lesson created successfully",
      course,
      // courseContent,
    });
  }

  // const lesson = await new Lesson({
  //   title,
  //   video,
  //   content,
  //   slug:
  //     instructor._id +
  //     "-" +
  //     courseContent.title +
  //     "-" +
  //     slugify(title, { lower: true }),
  // }).save();
  // // save created lesson to course.lesson array
  // courseContent.lessons.push(lesson._id);
  // const updatedCourse = await courseContent.save();

  // res.status(200).json({
  //   message: "Lesson created successfully",
  //   updatedCourse,
  // });
  // } catch (e) {
  //   res.status(500).json({
  //     message: "Error creating lesson.",
  //     error: e,
  //   });
  // }
};
