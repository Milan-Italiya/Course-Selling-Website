import { Curriculum } from "../models/curriculum.model.js";
import { LessonProgress } from "../models/lessonProgress.model.js";
import { hasCourseAccess } from "../utils/courseAccess.js";

export const getPlayerLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;

        const lesson = await Curriculum.findOne({
            _id: lessonId,
            courseId,
            isPublished: { $ne: false },
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found.",
            });
        }

        const userId = req.user?._id;

        const purchased = await hasCourseAccess(userId, courseId);

        const canAccessLesson = lesson.isPreview === true || purchased;

        if (!canAccessLesson) {
            return res.status(userId ? 403 : 401).json({
                success: false,
                code: "COURSE_PURCHASE_REQUIRED",
                message: userId
                    ? "Purchase this course to unlock this lesson."
                    : "Please login and purchase this course to unlock this lesson.",
            });
        }

        let progress = null;

        if (userId) {
            progress = await LessonProgress.findOne({
                userId,
                courseId,
                lessonId,
            });
        }

        return res.status(200).json({
            success: true,

            access: {
                isPreview: lesson.isPreview,
                hasPurchasedCourse: purchased,
                canAccessLesson: true,
            },

            lesson: {
                _id: lesson._id,
                courseId: lesson.courseId,
                title: lesson.title,
                description: lesson.description,
                duration: lesson.duration,
                order: lesson.order,
                videoUrl: lesson.videoUrl,
                content: lesson.content,
            },

            progress: progress
                ? {
                    lastPosition: progress.lastPosition,
                    watchedSeconds: progress.watchedSeconds,
                    isCompleted: progress.isCompleted,
                    completedAt: progress.completedAt,
                }
                : null,
        });
    } catch (error) {
        console.log("Get player lesson error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to load lesson.",
        });
    }
};

export const updateLessonProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const { lastPosition, watchedSeconds, isCompleted } = req.body;

        const lesson = await Curriculum.findOne({
            _id: lessonId,
            courseId,
            isPublished: { $ne: false },
        }).select("_id isPreview");

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found.",
            });
        }

        const purchased = await hasCourseAccess(req.user._id, courseId);

        const canAccessLesson = lesson.isPreview === true || purchased;

        if (!canAccessLesson) {
            return res.status(403).json({
                success: false,
                message: "Purchase this course to save lesson progress.",
            });
        }

        const updateData = {
            userId: req.user._id,
            courseId,
            lessonId,
        };

        if (lastPosition !== undefined) {
            updateData.lastPosition = Number(lastPosition);
        }

        if (watchedSeconds !== undefined) {
            updateData.watchedSeconds = Number(watchedSeconds);
        }

        if (typeof isCompleted === "boolean") {
            updateData.isCompleted = isCompleted;
            updateData.completedAt = isCompleted ? new Date() : null;
        }

        const progress = await LessonProgress.findOneAndUpdate(
            {
                userId: req.user._id,
                lessonId,
            },
            {
                $set: updateData,
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
            message: "Lesson progress saved successfully.",
            progress,
        });
    } catch (error) {
        console.log("Update lesson progress error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to save lesson progress.",
        });
    }
};

export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;

        const purchased = await hasCourseAccess(req.user._id, courseId);

        if (!purchased) {
            return res.status(403).json({
                success: false,
                message: "Purchase this course to view progress.",
            });
        }

        const lessons = await Curriculum.find({
            courseId,
            isPublished: { $ne: false },
        })
            .sort({
                order: 1,
                createdAt: 1,
            })
            .select("_id title order");

        const progress = await LessonProgress.find({
            userId: req.user._id,
            courseId,
        });

        const completedLessons = progress.filter((item) => item.isCompleted);

        const totalLessons = lessons.length;
        const completedLessonCount = completedLessons.length;

        const completionPercentage =
            totalLessons > 0
                ? Math.round((completedLessonCount / totalLessons) * 100)
                : 0;

        return res.status(200).json({
            success: true,

            summary: {
                totalLessons,
                completedLessonCount,
                completionPercentage,
            },

            lessons,
            progress,
        });
    } catch (error) {
        console.log("Get course progress error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch course progress.",
        });
    }
};