import express from "express";
import { BuyCourses, CourseDetails, CreateCourse, DeleteCourse, GetCourses, TopCourses, UpdateCourse } from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, CreateCourse);
router.put("/update/:courseId", adminMiddleware, UpdateCourse);
router.delete("/delete/:courseId", adminMiddleware, DeleteCourse);

router.get("/courses", GetCourses);
router.get("/top-courses", TopCourses) 
router.get("/:courseId", CourseDetails);

router.post("/buy/:courseId", userMiddleware, BuyCourses) //remove Middleware

export default router;