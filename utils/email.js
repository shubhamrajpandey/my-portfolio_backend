import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

export const sendNewMessageEmail = async (message) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "shubhamrajpandey875@gmail.com",
      subject: `New message from ${message.name}`,
      text: message.message,
    });
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

