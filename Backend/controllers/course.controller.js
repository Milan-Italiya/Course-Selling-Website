import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";
import config from "../config.js";


export const CreateCourse = async (req, res) => {
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

    return res
      .status(201)
      .json({ message: "Course created", course: newCourse });
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }
};

export const UpdateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, category, language } = req.body;

  try {
    const courseFind = await Course.findById(courseId);
    if (!courseFind) {
      return res.status(404).json({ errors: "Course not found" });
    }

    let updatedImage = courseFind.image; // default to existing image

    // Check if new image is uploaded
    if (req.file) {
      // You must have multer middleware configured in your route to populate req.file
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "courses",
      });
      updatedImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const course = await Course.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      {
        title,
        description,
        price,
        image: updatedImage,
        category,
        language,
      }
    );

    if (!course) {
      res.status(404).json({ errors: "Can't update this course because it is created by other admin" });
    }

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.log("error in update course : ", error);
    return res.status(500).json({ errors: error.message });
  }
};


export const DeleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res.status(404).json({ errors: "Can't delete this course because it is created by other admin" });
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("error in delete course : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const GetCourses = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json({ message: "All courses", course });
  } catch (error) {
    console.log("error in get course : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const CourseDetails = async (req, res) => {
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
export const BuyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ errors: "Course already purchased" });
    }

    const amount = course.price;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in buy course: ", error);
    res.status(500).json({ errors: "Error in buying course" });
  }
};

export const TopCourses = async (req, res) => {
  try {
    const topPurchases = await Purchase.aggregate([
      {
        $group: {
          _id: "$courseId",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ])
    console.log("Top Courses: ", topPurchases)

    const courseIds = topPurchases.map(p => p._id);
    const courses = await Course.find({ _id: { $in: courseIds } });
    res.status(200).json({ message: "Top courses", PopularCourses: courses, success: true });
  } catch (error) {
    console.log("Error in getting top courses", error.message)
    res.status(500).json({ errors: error.message, success: false });
  }
}
