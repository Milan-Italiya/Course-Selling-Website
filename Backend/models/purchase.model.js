import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
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

    paymentId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Succeeded",
        "Failed",
        "Cancelled",
        "Refunded",
      ],
      default: "Pending",
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

PurchaseSchema.index(
  {
    userId: 1,
    courseId: 1,
  },
  {
    unique: true,
  }
);

export const Purchase = mongoose.model("Purchase", PurchaseSchema);