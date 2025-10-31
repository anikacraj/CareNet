// utils/sendEmail.ts
import nodemailer from 'nodemailer';

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('Email error:', err);
  }
};
