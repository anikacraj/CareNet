import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, otp } = await req.json();
    console.log("VERIFY: Received", { email, otp });

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    // ✅ Explicitly select hidden fields
    const user = await userModel.findOne({ email }).select("+otp +otpExpire");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("VERIFY: Stored OTP =>", user.otp, "Expires =>", user.otpExpire);

    const now = new Date();
    if (user.otp !== otp || user.otpExpire < now) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });

  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
