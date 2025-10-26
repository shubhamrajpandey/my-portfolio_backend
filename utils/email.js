import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

export const sendNewMessageEmail = async (message) => {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "your-email@gmail.com", 
    subject: `New message from ${message.name}`,
    text: message.message,
  });
};
