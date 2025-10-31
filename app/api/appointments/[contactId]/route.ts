// app/api/appointments/[contactId]/route.ts
import { dbConnect } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { sendEmail } from "@/utils/sendGmail";

interface StatusUpdateRequest {
  status: 'accepted' | 'rejected';
  userId: string;
  date?: string;
  time?: string;
  doctorMessage?: string; // Changed from 'message' to 'doctorMessage'
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { contactId: string } }
) {
  await dbConnect();

  try {
    const { status, userId, date, time, doctorMessage }: StatusUpdateRequest = await request.json();
    const { contactId } = params;

    // Validation
    if (!status || !['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    if (status === 'accepted' && (!date || !time)) {
      return NextResponse.json(
        { success: false, error: "Date and time are required for acceptance" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(contactId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Database operations
    const user = await userModel.findById(userId).select("contacts name email");
    if (!user) return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });

    const contactIndex = user.contacts.findIndex(c => c._id.toString() === contactId);
    if (contactIndex === -1) return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });

    // Update contact
    const contact = user.contacts[contactIndex];
    contact.status = status;
    contact.updatedAt = new Date();

    if (status === 'accepted') {
      contact.date = date;
      contact.time = time;
      contact.doctorMessage = doctorMessage; // Correct field name
    } else {
      // Clear acceptance details if rejecting
      contact.date = undefined;
      contact.time = undefined;
      contact.doctorMessage = undefined;
    }

    // Force mongoose to recognize changes
    user.markModified('contacts');
    await user.save();

    // Email content
    const emailHtml = status === 'accepted' ? `
      <p>Dear ${contact.name},</p>
      <p>Your appointment has been <strong>accepted</strong>!</p>
      ${date && `<p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>`}
      ${time && `<p><strong>Time:</strong> ${time}</p>`}
      ${doctorMessage && `<p><strong>Doctor's Note:</strong> ${doctorMessage}</p>`}
      <p>Best regards,<br/>${user.name}</p>
    ` : `
      <p>Dear ${contact.name},</p>
      <p>We regret to inform you that your appointment has been <strong>rejected</strong>.</p>
      <p>Please contact us for more information.</p>
      <p>Best regards,<br/>${user.name}</p>
    `;

    // Send email
    await sendEmail({
      fromName: user.name,
      to: contact.email,
      subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      html: emailHtml
    });

    return NextResponse.json({
      success: true,
      contact: {
        ...contact.toObject(),
        _id: contact._id.toString(),
        date: contact.date?.toString(),
        createdAt: contact.createdAt.toString()
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Appointment update error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}