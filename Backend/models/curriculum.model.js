import mongoose from "mongoose";

const CurriculumSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    // Controls lesson sequence: 1, 2, 3...
    order: {
      type: Number,
      default: 0,
    },

    // URL of the lesson video
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Notes/content shown below the video player
    content: {
      type: String,
      default: "",
      trim: true,
    },

    // Admin can hide a lesson without deleting it
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

CurriculumSchema.index({ courseId: 1, order: 1 });

export const Curriculum = mongoose.model("Curriculum", CurriculumSchema);