import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";
import config from "../config.js";

export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  try {
    const { title, description, price, category, language } = req.body;
    console.log("body data : ", req.body);

    const imageFormat = ["image/png", "image/jpeg"];
    console.log("image from req body : ", req.files);

    if (!title || !description || !price || !category || !language) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }
    const { image } = req.files;

    if (!imageFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Only PNG and JPG image format allowed" });
    }

    // cloudnary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res.status(500).json({ errors: "Cloudinary upload failed" });
    }

    const newCourse = new Course({
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      category,
      language,
      creatorId: adminId,
    });
    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Course created Successfully!",
      course: newCourse,
    });
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, category, language } = req.body;

  try {
    const courseFind = await Course.findById(courseId);
    if (!courseFind) {
      return res.status(404).json({ errors: "Course not found" });
    }

    let updatedImage = courseFind.image; // Defaults to existing image configuration

    // FIX 1: Use req.files (matches your CreateCourse parsing layout)
    if (req.files && req.files.image) {
      const { image } = req.files;

      const imageFormat = ["image/png", "image/jpeg", "image/jpg"];
      if (!imageFormat.includes(image.mimetype)) {
        return res
          .status(400)
          .json({ errors: "Only PNG and JPG image formats are allowed" });
      }

      // Uploading to Cloudinary using the correct temporary file path
      const cloud_response = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          folder: "courses",
        },
      );

      if (!cloud_response || cloud_response.error) {
        return res.status(500).json({ errors: "Cloudinary upload failed" });
      }

      updatedImage = {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url || cloud_response.url,
      };
    }

    // FIX 2: Added { new: true } option to pass back the updated course object instead of the stale data
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      {
        title,
        description,
        price,
        image: updatedImage,
        category,
        language,
      },
      { new: true }, // <--- CRITICAL: Returns the modified document to the client
    );

    if (!updatedCourse) {
      // Use return statement here to halt execution and avoid double response errors
      return res.status(404).json({
        errors:
          "Can't update this course because it was created by another admin",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.log("Error in update course: ", error);
    return res.status(500).json({ success: false, errors: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({
      _id: courseId,
      creatorId: adminId,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        errors:
          "Can't delete this course because it is created by another admin",
      });
    }

    const purchaseExists = await Purchase.findOne({
      courseId,
    });

    if (purchaseExists) {
      return res.status(400).json({
        success: false,
        errors: "This course has enrolled students and cannot be deleted.",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete course:", error);
    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json({ message: "All courses", course });
  } catch (error) {
    console.log("error in get course : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    res.status(200).json({ message: "Course details", course });
  } catch (error) {
    console.log("Errors in getting course details.", error);
    return res.status(500).json({ errors: error.message });
  }
};

import Stripe from "stripe";
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

console.log("stripe key: ", config.STRIPE_SECRET_KEY);

// stripe integration
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        errors: "Course not found",
      });
    }

    const existingPurchase = await Purchase.findOne({
      userId,
      courseId,
    });

    if (existingPurchase?.status === "Succeeded") {
      return res.status(400).json({
        success: false,
        errors: "Course already purchased",
        purchase: existingPurchase,
      });
    }

    const amount = Number(course.price);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        errors: "Invalid course price",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId: userId.toString(),
        courseId: courseId.toString(),
      },
    });

    const purchase = await Purchase.findOneAndUpdate(
      {
        userId,
        courseId,
      },
      {
        $set: {
          userId,
          courseId,
          paymentId: paymentIntent.id,
          status: "Pending",
          amount,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment started. Course added with pending status.",
      course,
      purchase,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in buy course: ", error);

    return res.status(500).json({
      success: false,
      errors: "Error in buying course",
    });
  }
};

export const topCourses = async (req, res) => {
  try {
    const topPurchases = await Purchase.aggregate([
      {
        $match: {
          status: "Succeeded",
        },
      },
      {
        $group: {
          _id: "$courseId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    console.log("Top Courses: ", topPurchases);

    const courseIds = topPurchases.map((p) => p._id);
    const courses = await Course.find({ _id: { $in: courseIds } });
    res
      .status(200)
      .json({ message: "Top courses", PopularCourses: courses, success: true });
  } catch (error) {
    console.log("Error in getting top courses", error.message);
    res.status(500).json({ errors: error.message, success: false });
  }
};
