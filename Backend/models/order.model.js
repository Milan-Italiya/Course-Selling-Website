import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: String,
    email: String,
    userId: String,
    courseId: String,
    courseTitle: String,
    paymentId: String,
    status: String,
    amount: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const Order = mongoose.model("Order", orderSchema);