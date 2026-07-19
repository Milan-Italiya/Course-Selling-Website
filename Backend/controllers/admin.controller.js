import { User } from "../models/user.model.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const adminSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "First name must be atleast 3 character" }),
    lastName: z
      .string()
      .min(3, { message: "Last     name must be atleast 3 character" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });
  const validationResult = adminSchema.safeParse(req.body);
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
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ errors: "Admin already exists" });
    }
    const passwordStr = password.toString();
    const hashedPassword = crypto
      .createHash("sha1")
      .update(passwordStr)
      .digest("hex");
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await config.transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Learnova — Admin Account Activated",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="text-align:center; padding-bottom:15px; border-bottom:1px solid #ddd;">
              <h1 style="color:#1f2937; margin:0;">Learnova — Admin Panel</h1>
              <p style="color:#555; margin-top:5px;">Learn. Grow. Succeed.</p>
            </div>

            <!-- Body -->
            <p style="font-size:16px; color:#333;">Dear <b>${firstName}</b>,</p>

            <p style="font-size:15px; color:#555;">
              Your <b>Learnova Admin Account</b> has been successfully created and activated.
            </p>

            <p style="font-size:15px; color:#555;">
              As an Admin, you now have access to the Learnova administration panel where you can 
              manage courses, users, payments, and overall platform operations.
            </p>

            <h3 style="color:#1f2937;">Your Admin Capabilities Include:</h3>
            <ul style="color:#555; font-size:15px;">
              <li>Managing course content and instructors</li>
              <li>Monitoring user activity and enrollments</li>
              <li>Handling transactions and analytics</li>
              <li>Updating platform settings and policies</li>
            </ul>

            <p style="font-size:15px; color:#555;">
              <b>Registered Admin Email:</b> ${email}
            </p>

            <!-- Admin Login Button -->
            <div style="text-align:center; margin:25px 0;">
              <a href="http://localhost:5175/admin/login"
                style="background:#111827; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:16px;">
                Go to Admin Login
              </a>
            </div>

            <p style="font-size:14px; color:#555;">
              For security purposes, please keep your login credentials confidential and do not share them with anyone.
            </p>

            <p style="font-size:14px; color:#555;">
              If you face any issues while accessing the admin panel, please contact technical support.
            </p>

            <!-- Footer -->
            <div style="text-align:center; margin-top:20px; padding-top:15px; border-top:1px solid #ddd;">
              <p style="color:#777; font-size:14px;">
                Best regards,<br/>
                <b>Learnova Administration Team</b><br/>
                support@learnova.com
              </p>
            </div>

          </div>
        </div>
  `,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Signup Successfull! check your email.",
      admin: newAdmin,
    });
  } catch (error) {
    console.log("error in signup : ", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ errors: "Admin not found" });
    }
    const inputHashed = crypto
      .createHash("sha1")
      .update(password.toString())
      .digest("hex");
    if (inputHashed !== admin.password) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      config.JWT_ADMIN_PASSWORD,
      {
        expiresIn: "1d",
      },
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true, // can't be accessed directly by client-side[Javascript] JS
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Strict", // CSRF protection
    };

    res.cookie("jwt_token", token, cookieOptions);
    res.status(201).json({ message: "Login successfull", admin, token });
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

export const Getadmins = async (req, res) => {
  try {
    const adminData = await Admin.find({});
    res.status(200).send({ message: "All admins", adminData });
  } catch (error) {
    console.log("Error in getting admins :", error);
    return res.status(500).json({ errors: "Error in fetching admins" });
  }
};
