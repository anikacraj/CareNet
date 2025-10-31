// app/api/sendEmails/route.ts - Updated with proper validation and error handling
import { NextResponse } from 'next/server';
import { dbConnect } from '@/config/dbConnect';
import userModel from '@/models/user.model';
import { sendEmail } from '@/utils/sendGmail';

export async function POST(req: Request) {
  try {
    const { userId, to, subject, text, html } = await req.json();

    // Validate required fields
    if (!userId || !to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, to, or subject' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch doctor's profile with basic projection
    const doctor = await userModel.findById(userId).select('name email').lean();
    
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Send email with doctor's name
    await sendEmail({
      fromName: doctor.name,
      to,
      subject,
      text: text || '',
      html: html || '',
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}