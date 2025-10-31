import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";
import { dbConnect } from "@/config/dbConnect";
import { verificationEmailTemplate } from "@/utils/verificationEmailTemplate";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, phoneNo } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNo,
    });

    // Generate and store verification token
    const verificationToken = newUser.getVerificationToken();

    // Save user with hashed token
    await newUser.save();

    // Create verification link
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser._id}`;
    const message = verificationEmailTemplate(verificationLink);

    // Send verification email
    await sendEmail(newUser.email, "Email Verification", message);

    return NextResponse.json(
      { message: "User registered successfully. Verification email sent." },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
