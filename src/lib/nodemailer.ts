import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.NODEMAILER_SECURE === "true" ? 465 : 587,
  secure: process.env.NODEMAILER_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

export default transporter;
