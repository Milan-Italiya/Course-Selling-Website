import mongoose from "mongoose";
const PurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    paymentId: {
        type: String,
        required: true,
    }
});

export const Purchase = mongoose.model("Purchase", PurchaseSchema);
