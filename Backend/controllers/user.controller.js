import { User } from "../models/user.model.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
import Stripe from "stripe";
import { FeedBack } from "../models/feedback.model.js";
import mongoose from "mongoose";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be atleast 2 character" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be atleast 3 character" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });
  const validationResult = userSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      errors: validationResult.error.issues.map(
        (validation) => validation.message,
      ),
    });
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
    const hashedPassword = crypto
      .createHash("sha1")
      .update(passwordStr)
      .digest("hex");
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await config.transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Learnova — Your Account is Ready",
      html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#eef2f6; padding:30px 15px;">
        <div style="max-width:620px; margin:auto; background:#ffffff; padding:30px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
    
          <!-- Header -->
          <div style="text-align:center; padding-bottom:18px; border-bottom:1px solid #e5e7eb;">
            <h1 style="color:#111827; margin:0; letter-spacing:0.5px;">Learnova</h1>
            <p style="color:#6b7280; margin-top:6px;">Empowering Your Learning Journey</p>
          </div>
    
          <!-- Body -->
          <p style="font-size:16px; color:#1f2937; margin-top:18px;">
            Dear <b>${firstName}</b>,
          </p>
    
          <p style="font-size:15px; color:#4b5563; line-height:1.6;">
            Welcome to <b>Learnova!</b> Your user account has been successfully created and is now active. 
            We are excited to have you as part of our learning community.
          </p>
    
          <p style="font-size:15px; color:#4b5563; line-height:1.6;">
            Learnova provides a structured and engaging learning experience, helping you acquire new skills, 
            build expertise, and achieve your educational goals through high-quality courses and resources.
          </p>
    
          <h3 style="color:#111827; margin-top:20px;">With your Learnova account, you can:</h3>
          <ul style="color:#4b5563; font-size:15px; line-height:1.6;">
            <li>Explore and enroll in premium courses</li>
            <li>Access learning materials anytime</li>
            <li>Track your progress and achievements</li>
            <li>Download certificates upon completion</li>
            <li>Receive updates on new courses and offers</li>
          </ul>
    
          <p style="font-size:15px; color:#4b5563;">
            <b>Registered Email:</b> ${email}
          </p>
    
          <!-- User Login Button -->
          <div style="text-align:center; margin:28px 0;">
            <a href="http://localhost:5174/login"
               style="background:#111827; color:white; padding:12px 28px; text-decoration:none; border-radius:6px; font-size:16px; font-weight:600;">
               Access Your Account
            </a>
          </div>
    
          <p style="font-size:14px; color:#6b7280;">
            For your security, please keep your login credentials confidential and avoid sharing them with anyone.
          </p>
    
          <p style="font-size:14px; color:#6b7280;">
            If you need any assistance, feel free to reach out to our support team.
          </p>
    
          <!-- Footer -->
          <div style="text-align:center; margin-top:22px; padding-top:18px; border-top:1px solid #e5e7eb;">
            <p style="color:#6b7280; font-size:14px; line-height:1.5;">
              Warm regards,<br/>
              <b>Learnova Team</b><br/>
              support@learnova.com
            </p>
          </div>
    
        </div>
      </div>
      `,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup Successfull! check your email.",
      user: newUser,
    });
  } catch (error) {
    console.log("error in signup : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }
    const inputHashed = crypto
      .createHash("sha1")
      .update(password.toString())
      .digest("hex");
    if (inputHashed !== user.password) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_USER_PASSWORD,
      {
        expiresIn: "1d",
      },
    );
    console.log("Admin login token: ", token);


    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true, // can't be accessed directly by client-side[Javascript] JS
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Strict", // CSRF protection
    };

    res.cookie("jwt_token", token, cookieOptions);
    res.status(201).json({ message: "Login successfull", user, token });
  } catch (error) {
    console.log("error in login : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

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

  try {
    const purchased = await Purchase.find({ userId })
      .populate("courseId")
      .sort({ updatedAt: -1 });

    const courseData = purchased
      .filter((purchase) => purchase.courseId)
      .map((purchase) => ({
        _id: purchase.courseId._id,
        title: purchase.courseId.title,
        description: purchase.courseId.description,
        price: purchase.courseId.price,
        image: purchase.courseId.image,
        category: purchase.courseId.category,
        language: purchase.courseId.language,

        purchaseId: purchase._id,
        paymentId: purchase.paymentId,
        status: purchase.status,
        amount: purchase.amount,
        createdAt: purchase.createdAt,
        updatedAt: purchase.updatedAt,
      }));

    return res.status(200).json({
      success: true,
      message: "Purchased courses",
      purchased,
      courseData,
    });
  } catch (error) {
    console.log("error in purchases:", error.message);

    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const getusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "All users", users });
  } catch (error) {
    console.log("Error in getting users :", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const deleteuser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      errors: "Invalid user ID",
    });
  }
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("error in delete user:", error.message);
    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const updateuser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      errors: "Invalid user ID",
    });
  }
  try {
    const updateData = { firstName, lastName, email };

    if (password) {
      updateData.password = crypto
        .createHash("sha1")
        .update(password.toString())
        .digest("hex");
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updating user:", error.message);
    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      errors: "Invalid user ID",
    });
  }
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

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
        message,
      });
      await newFeedback.save();
      res
        .status(201)
        .json({ message: "Feedback sent successfully", newFeedback });
    }
  } catch (error) {
    console.log("Error in sending feedback :", error);
    return res.status(500).json({ errors: error.message });
  }
};
