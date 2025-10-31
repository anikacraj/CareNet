// app/api/users/[userId]/appointments/route.ts
import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface Appointment {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  doctorMessage?: string;
  date?: string;
  time?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  try {
    const { userId } = params;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as 'pending' | 'accepted' | 'rejected' | null;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid doctor ID format" },
        { status: 400 }
      );
    }

    const user = await userModel.findById(userId)
      .select('contacts name')
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Doctor not found" },
        { status: 404 }
      );
    }

    let appointments: Appointment[] = user.contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString(), // Convert to string for client compatibility
      doctorMessage: contact.doctorMessage || undefined,
      date: contact.date || undefined,
      time: contact.time || undefined
    }));

    if (status) {
      appointments = appointments.filter(appt => appt.status === status);
    }

    // Sort by creation date descending
    appointments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        count: appointments.length,
        appointments
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch appointments. Please try again later."
      },
      { status: 500 }
    );
  }
}