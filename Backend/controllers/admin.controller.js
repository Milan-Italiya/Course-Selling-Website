import { User } from "../models/user.model.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const adminSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be atleast 3 character" }),
        lastName: z.string().min(3, { message: "Last name must be atleast 3 character" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });
    const validationResult = adminSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.issues.map(validation => validation.message) });
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
        const hashedPassword = crypto.createHash('sha1').update(passwordStr).digest('hex');
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        console.log("error in signup : ", error);
        return res.status(500).json({ errors: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ errors: "Admin not found" });
        }
        const inputHashed = crypto.createHash('sha1').update(password.toString()).digest('hex');
        if (inputHashed !== admin.password) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: admin._id
        }, config.JWT_ADMIN_PASSWORD,
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
        res.status(201).json({ message: "Login successfull", admin, token });
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

export const Getadmins = async (req, res) => {
    try {
        const adminData = await Admin.find({})
        res.status(200).send({ message: "All admins", adminData })
    } catch (error) {
        console.log("Error in getting admins :", error);
        return res.status(500).json({ errors: "Error in fetching admins" });
    }
}