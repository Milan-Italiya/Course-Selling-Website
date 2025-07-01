import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
    }
})

export const Team = mongoose.model('Team', TeamSchema);