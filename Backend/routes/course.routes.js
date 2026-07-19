import express from "express";
import { buyCourses, courseDetails, createCourse, deleteCourse, getCourses, topCourses, updateCourse } from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, updateCourse);
router.delete("/delete/:courseId", adminMiddleware, deleteCourse);

router.get("/courses", getCourses);
router.get("/top-courses", topCourses)
router.get("/:courseId", courseDetails);

router.post("/buy/:courseId", userMiddleware, buyCourses) //remove Middleware

export default router;