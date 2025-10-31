// app/api/users/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/config/dbConnect";
import User from "@/models/user.model";

export async function GET() {
  await dbConnect();

  try {
    const allUsers = await User.find().select("-password"); // exclude password
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
