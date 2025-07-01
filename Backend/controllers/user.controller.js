import { User } from "../models/user.model.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
import Stripe from "stripe";
import { FeedBack } from "../models/feedback.model.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(2, { message: "First name must be atleast 2 character" }),
        lastName: z.string().min(3, { message: "Last name must be atleast 3 character" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });
    const validationResult = userSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.issues.map(validation => validation.message) });
    }
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ errors: "All fields are required" });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }
        const passwordStr = password.toString();
        const hashedPassword = crypto.createHash('sha1').update(passwordStr).digest('hex');
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "Signup Successfull", user: newUser });
    } catch (error) {
        console.log("error in signup : ", error);
        return res.status(500).json({ errors: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ errors: "User not found" });
        }
        const inputHashed = crypto.createHash('sha1').update(password.toString()).digest('hex');
        if (inputHashed !== user.password) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id
        }, config.JWT_USER_PASSWORD,
            {
                expiresIn: "1d"
            }
        );

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true, // can't be accessed directly by client-side[Javascript] JS
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "Strict" // CSRF protection
        };

        res.cookie("jwt_token", token, cookieOptions);
        res.status(201).json({ message: "Login successfull", user, token });
    } catch (error) {
        console.log("error in login : ", error);
        return res.status(500).json({ errors: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt_token) {
            return res.status(400).json({ errors: "Kindly login first" });
        }
        res.clearCookie("jwt_token");
        res.status(200).json({ message: "Logout successfull" });
    } catch (error) {
        console.log("error in logout : ", error);
        return res.status(500).json({ errors: error.message });
    }
};

export const purchases = async (req, res) => {
    const userId = req.userId;
    console.log("userId : ", userId);
    try {
        const purchased = await Purchase.find({ userId: userId });

        if (!purchased) {
            return res.status(400).json({ errors: "No purchase found" });
        }
        let purchasedId = [];
        purchased.forEach(p => purchasedId.push(p.courseId));


        const courseData = await Course.find({ _id: { $in: purchasedId } });

        res.status(200).json({ message: "Purchased courses", purchased, courseData });

    } catch (error) {
        console.log("error in purchases : ", error);
        return res.status(500).json({ errors: error.message });
    }
}

export const getusers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: "All users", users });
    } catch (error) {
        console.log("Error in getting users :", error);
        return res.status(500).json({ errors: error.message });
    }
}

export const feedback = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        if (!name || !email || !subject || !message) {
            res.status(400).json({ errors: "All fields are required" });
        } else {
            const newFeedback = new FeedBack({
                name,
                email,
                subject,
                message
            });
            await newFeedback.save();
            res.status(201).json({ message: "Feedback sent successfully", newFeedback });
        }
    } catch (error) {
        console.log("Error in sending feedback :", error);
        return res.status(500).json({ errors: error.message });
    }
}
