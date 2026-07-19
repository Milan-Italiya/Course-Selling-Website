import mongoose from "mongoose";
import { Curriculum } from "../models/curriculum.model.js";

export const createCurriculum = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      duration,
      isPreview,
      order,
      videoUrl,
      content,
      isPublished,
    } = req.body;

    if (!courseId || !title || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: "Course, title, description and duration are required.",
      });
    }

    const curriculum = await Curriculum.create({
      courseId,
      title,
      description,
      duration,

      isPreview: isPreview === true || isPreview === "true",

      order: order ? Number(order) : 0,

      videoUrl: videoUrl || "",

      content: content || "",

      isPublished:
        isPublished === undefined
          ? true
          : isPublished === true || isPublished === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Curriculum lesson created successfully.",
      curriculum,
    });
  } catch (error) {
    console.log("Create curriculum error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create curriculum lesson.",
    });
  }
};

export const updateCurriculum = async (req, res) => {
  try {
    const { curriculumId } = req.params;

    const {
      courseId,
      title,
      description,
      duration,
      isPreview,
      order,
      videoUrl,
      content,
      isPublished,
    } = req.body;

    const updatedCurriculum = await Curriculum.findByIdAndUpdate(
      curriculumId,
      {
        courseId,
        title,
        description,
        duration,

        isPreview: isPreview === true || isPreview === "true",

        order: order ? Number(order) : 0,

        videoUrl: videoUrl || "",

        content: content || "",

        isPublished:
          isPublished === undefined
            ? true
            : isPublished === true || isPublished === "true",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCurriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum lesson not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Curriculum lesson updated successfully.",
      curriculum: updatedCurriculum,
    });
  } catch (error) {
    console.log("Update curriculum error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update curriculum lesson.",
    });
  }
};

export const deleteCurriculum = async (req, res) => {
  try {
    const { curriculumId } = req.params;

    const deletedCurriculum = await Curriculum.findByIdAndDelete(curriculumId);

    if (!deletedCurriculum) {
      return res
        .status(404)
        .json({ success: false, message: "Curriculum not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Curriculum deleted successfully!" });
  } catch (error) {
    console.log("Error deleting curriculum: ", error.message);
    res.status(404).json({ success: false, errors: error.message });
  }
};

export const getCurriculumByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    console.log("Received courseId:", courseId);

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Valid courseId is required.",
      });
    }

    const curriculum = await Curriculum.find({
      courseId,
      isPublished: { $ne: false },
    })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .select(
        "_id courseId title description duration isPreview order videoUrl content isPublished"
      );

    return res.status(200).json({
      success: true,
      message: "Course curriculum fetched successfully.",
      curriculum,
    });
  } catch (error) {
    console.log("Get curriculum by course error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch course curriculum.",
      error: error.message,
    });
  }
};

export const getAllCurriculums = async (req, res) => {
  try {
    const curriculum = await Curriculum.find()
      .populate("courseId", "title")
      .sort({
        order: 1,
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,
      curriculum,
    });
  } catch (error) {
    console.log("Error fetching curriculum:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchCurriculumById = async (req, res) => {
  try {
    const { curriculumId } = req.params;

    // FIND CURRICULUM

    const curriculum = await Curriculum.findById(curriculumId);

    // CHECK CURRICULUM

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found!",
      });
    }

    // SUCCESS RESPONSE

    return res.status(200).json({
      success: true,
      curriculum,
    });
  } catch (error) {
    console.log(
      "Error fetching curriculum by id:",
      error.message
    );

    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};
