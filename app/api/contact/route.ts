import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface ContactData {
  name: string;
  email: string;
  address?: string;
  phoneNo?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Valid doctor ID is required" },
        { status: 400 }
      );
    }

    const { name, email, address, phoneNo, message }: ContactData = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const newContact = {
      name: name.trim(),
      email: email.trim(),
      address: address?.trim() || "",
      phoneNo: phoneNo?.trim() || "",
      message: message.trim(),
      status: "pending",
      createdAt: new Date(),
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { contacts: newContact } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    const addedContact = updatedUser.contacts[updatedUser.contacts.length - 1];

    return NextResponse.json(
      { message: "Appointment request submitted successfully", contact: addedContact },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Contact submission error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
