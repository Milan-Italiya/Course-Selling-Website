import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // This stores Curriculum _id
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curriculum",
      required: true,
    },

    lastPosition: {
      type: Number,
      default: 0,
      min: 0,
    },

    watchedSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

lessonProgressSchema.index(
  {
    userId: 1,
    lessonId: 1,
  },
  {
    unique: true,
  },
);

export const LessonProgress = mongoose.model(
  "LessonProgress",
  lessonProgressSchema,
);
