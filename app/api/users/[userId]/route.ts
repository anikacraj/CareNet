import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Await params before accessing properties
  const { userId } = await params;
  
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: "Invalid user ID format" },
      { status: 400 }
    );
  }

  try {
    const user = await userModel
      .findById(userId)
      .select("-password -verifyToken -verifyTokenExpire");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add appointment counts to response
    const appointmentStats = {
      total: user.contacts.length,
      pending: user.contacts.filter((c: any) => c.status === "pending").length,
      accepted: user.contacts.filter((c: any) => c.status === "accepted")
        .length,
      rejected: user.contacts.filter((c: any) => c.status === "rejected")
        .length,
    };

    return NextResponse.json({ ...user.toObject(), appointmentStats });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Await params before accessing properties
  const { userId } = await params;
  
  await dbConnect();

  try {
    const updateData = await request.json();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Remove sensitive fields if present
    const { password, verifyToken, verifyTokenExpire, ...safeUpdateData } =
      updateData;

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, { $set: safeUpdateData }, { new: true, runValidators: true })
      .select("-password -verifyToken -verifyTokenExpire");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Await params before accessing properties
  const { userId } = await params;
  
  await dbConnect();

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}