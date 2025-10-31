import User from '@/models/user.model';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { dbConnect } from '@/config/dbConnect';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const rawToken = searchParams.get("verifyToken") as string;
    const userId = searchParams.get("id");

    if (!rawToken || !userId) {
      return new Response("Missing verification token or user ID", {
        status: 400,
      });
    }

    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    const user = await User.findOne({
      _id: userId,
      verifyToken: hashedToken,
      verifyTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return new Response("Invalid or expired verification token", {
        status: 400,
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return new Response("Email verified successfully", {
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
