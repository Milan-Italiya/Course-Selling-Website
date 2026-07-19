import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY =
  "sk_test_51R6xL9H0LX80q8lvCmg5l5vbk6pCchNBZMgD6T0M0NsLHOcN9cjcDGUmdUfG6EXNTLrVXBKSTupmaZZHhXtZGRCP00CPULUgQk";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },  
});
export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
  transporter
};
