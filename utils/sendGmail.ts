import nodemailer from 'nodemailer';

interface EmailOptions {
  fromName: string;  // now we expect only the doctor's name, not their real email
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ fromName, to, subject, text, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,   // Static server Gmail
      pass: process.env.GMAIL_PASS,   // Static server Gmail password
    },
  });

  const mailOptions = {
    from: `"Dr. ${fromName}" <${process.env.GMAIL_USER}>`,  // shows doctor's name but uses server email
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
}
