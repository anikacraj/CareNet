// app/[userId]/editProfile/page.tsx

import { notFound, redirect } from "next/navigation";
import DoctorProfileEditor from "./DoctorProfileEditor";
import userModel from "@/models/user.model"; // Ensure correct model path
import { dbConnect } from "@/config/dbConnect";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/authOptions";
// Ensure correct path

export default async function EditProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  // Ensure MongoDB connection is established
  await dbConnect();

  // Fetch the logged-in user session
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    return redirect("/login");
  }

  // Check if logged-in user is the same as the requested user
  if (session.user.id !== userId) {
    return notFound();
  }

  // Fetch only the user._id from MongoDB using Mongoose
  const user = await userModel.findById(userId).select("_id");

  // Log user._id in the console
  console.log("Fetched User ID:", user?._id);

  // Handle case if user is not found
  if (!user) {
    return notFound();
  }

  return <DoctorProfileEditor />;
}
