// // app/api/users/[userId]/update/route.ts

// import { dbConnect } from '@/config/dbConnect';
// import userModel from '@/models/user.model';
// import { NextResponse } from 'next/server';
// ; // your Mongoose model

// export async function PUT(request: Request, { params }: { params: { userId: string } }) {
//   try {
//     await dbConnect();

//     const { userId } = params;
//     const body = await request.json(); // get submitted form data

//     const updatedUser = await userModel.findByIdAndUpdate(userId, body, { new: true });

//     if (!updatedUser) {
//       return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: updatedUser });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
//   }
// }
