// /api/forget-password/request/route.ts

import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { forgetPasswordOtp } from "@/utils/forgetPasswordOtp";
import { NextResponse } from "next/server";
// Make sure this works

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();
    console.log("REQUEST: Got email =>", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

    user.otp = otp;
    user.otpExpire = otpExpire;

    await user.save();
    console.log("OTP Saved:", user.otp, user.otpExpire);

    // Simulate sending email
    await forgetPasswordOtp({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}`,
    });

    return NextResponse.json({ message: "OTP sent successfully", otp }); // expose OTP for testing
  } catch (error) {
    console.error("REQUEST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
