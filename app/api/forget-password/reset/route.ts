import { dbConnect } from '@/config/dbConnect';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import userModel from '@/models/user.model';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();
  return NextResponse.json({ message: "Password reset successful" });
}
