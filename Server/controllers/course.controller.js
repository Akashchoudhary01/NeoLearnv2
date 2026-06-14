import fs from "fs";
import COURSE from "../models/course.model.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";

/////////////////////
/////////////////////
const getAllCourse = async (req, res, next) => {
  try {
    const courses = await COURSE.find().select("-lectures");

    if (!courses) {
      return next(new AppError("No Course Found", 404));
    }

    res.status(200).json({
      message: "All Courser",
      success: true,
      courses,
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};
//////////////////////
/////////////////////
const getLectureByCourseId = async (req, res, next) => {
  console.log("PARAMS:", req.params);
  const courseId = req.params.id;

  const course = await COURSE.findById(courseId);

  if (!course) {
    return next(new AppError("Course Not Found", 401));
  }

  res.status(200).json({
    success: true,
    message: "course lectuer fetched successfully",
    lecture: course.lectures,
  });
};

/////////////////////
/////////////////////
const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy, lectures, thumbnail } =
    req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("Every Field Is Mendatory"));
  }
  try {
    const course = await COURSE.create({
      title,
      description,
      category,
      createdBy,
      lectures,
      thumbnail: {
        public_id: "default",
        secure_url: "",
      },
    });

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "neoLearn",
        crop: "fill",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }
      await course.save();
        
         if (fs.existsSync(req.file.path)) {
             await fs.promises.unlink(req.file.path);
         }
    }
    await course.save();
    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};

//////////////////////
//////////////////////
const AddLectureToCourseById = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if (!title || !description) {
    return next(new AppError("Every Field is mendatory !", 400));
  }

  const course = await COURSE.findById(id);

  if (!course) {
    return next(new AppError("Course Not found !", 404));
  }
  const lectureData = {
    title,
    description,
    video: {},
  };

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "neoLearn",
      resource_type : "video"
    });
    if (!result) {
      return next(new AppError("Something Went Wrong", 400));
    }

    lectureData.video = {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
    
      if (fs.existsSync(req.file.path)) {
          await fs.promises.unlink(req.file.path);
      }
    
  }
  
  course.lectures.push(lectureData);
  // await course.save();/

  course.noOfLecture = course.lectures.length;
  await course.save();
  // Send response ✅
  res.status(200).json({
    success: true,
    message: "Lecture added successfully",
    course,
  });
};

/////////////////////
/////////////////////
const deleteLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await COURSE.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          lectures: { _id: lectureId },
        },
      },
      { new: true }
    );

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      course,
    });

  } catch (err) {
    next(err);
  }
};

//////////////////////
//////////////////////
const deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;

  try {
    const course = await COURSE.findByIdAndDelete(courseId);

    res.status(204).json({
      success: true,
      message: "Course Deleted SuccessFully !",
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};
//////////////////////
//////////////////////

const updateCourse = async (req, res, next) => {
  const { title, description, category, thumbnail } = req.body;

  const courseId = req.params.id;

  const course = await COURSE.findById(courseId);

  if (!course) {
    return next(new AppError("Course Not Found !", 404));
  }

  try {
    //updating the new updates
    if (title) {
      course.title = title;
    }
    if (description) {
      course.description = description;
    }
    if (category) {
      course.category = category;
    }
    if (req.file) {
      if (course.thumbnail && course.thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
      }

      //uploading the new Thumbnail

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "neoLearn",
          crop: "fill",
        });

        if (result) {
          course.thumbnail.secure_url = result.secure_url;
          course.thumbnail.public_id = result.public_id;
        }

        await course.save();

           if (fs.existsSync(req.file.path)) {
               await fs.promises.unlink(req.file.path);
           }
        
      } catch (e) {
        return next(new AppError("Unable to update Thumbnail", 400));
      }
    }

    await course.save();
    res.status(200).json({
      success: true,
      message: "course Updated Successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};
export {
  getAllCourse,
  getLectureByCourseId,
  createCourse,
  deleteCourse,
  updateCourse,
  AddLectureToCourseById,
  deleteLectureById,
};
