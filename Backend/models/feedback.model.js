import mongoose from "mongoose";

const FeedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

export const FeedBack = mongoose.model("FeedBack", FeedBackSchema);