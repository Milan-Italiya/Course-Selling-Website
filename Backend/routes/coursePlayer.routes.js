import express from "express";
import {
  optionalCourseAuth,
  requireCourseAuth,
} from "../middlewares/coursePlayerAuth.middleware.js";
import {
  getCourseProgress,
  getPlayerLesson,
  updateLessonProgress,
} from "../controllers/coursePlayer.controller.js";

const router = express.Router();

router.get(
  "/course/:courseId/lesson/:lessonId",
  optionalCourseAuth,
  getPlayerLesson,
);
router.patch(
  "/course/:courseId/lesson/:lessonId/progress",
  requireCourseAuth,
  updateLessonProgress,
);
router.get("/course/:courseId/progress", requireCourseAuth, getCourseProgress);

export default router;
