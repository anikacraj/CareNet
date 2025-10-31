import { Button } from "@/components/ui/button";
import Contact from "./Contact";
import ProfilePhoto from "./ProfilePhoto";
import PhotoGallery from "./PhotoGallery";
import Social from "@/components/ui/social";
import { dbConnect } from "@/config/dbConnect";
import Link from "next/link";
import { notFound } from "next/navigation";
import userModel from "@/models/user.model";
import { ShieldCheck } from "lucide-react";
import mongoose from "mongoose";

// Accept params to get the dynamic ID from the route
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // Await params before accessing properties
  const { userId } = await params;
  
  // Validate ObjectId format before querying database
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return notFound();
  }
  
  await dbConnect();
  const user = await userModel.findById(userId);

  if (!user) {
    return notFound();
  }

  // If user is blocked and still within the block period
  if (
    user.blocked &&
    user.blockedUntil &&
    new Date(user.blockedUntil) > new Date()
  ) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h1 className="text-2xl font-bold">
          ⚠️ This profile is currently blocked.
        </h1>
        <p>
          Access will be restored on{" "}
          {new Date(user.blockedUntil).toLocaleDateString()}
        </p>
      </div>
    );
  }

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className=" flex flex-col-reverse xl:flex-row items-center justify-around xl:pt-8 xl:pb-24 xl:mt-15">
          <div className="text-center xl:text-left font-serif space-y-4 ">
            <span className="text-2xl text-gray-500 dark:text-gray-400 tracking-wide">
              Hello & welcome
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              I'm Dr. <br />
              <span className="text-blue-500 dark:text-accent ">
                {user.name}{" "}
                {user.adminVerified && (
                  <span className="relative ml-3 group inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-600 shadow-md cursor-pointer">
                    <ShieldCheck className="w-[35px] h-[24px] text-white" />
                    <span className="absolute bottom-full mb-1 hidden group-hover:flex text-xs text-white bg-gray-900 px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      Verified Medical Professional
                    </span>
                  </span>
                )}
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-700 dark:text-gray-300 border-l-4 border-blue-400 pl-4 italic">
              Passionate about healing and driven by compassion, I specialize in{" "}
              <span className="font-semibold text-blue-600 dark:text-accent">
                {user.specialization || "patient-centered care"}
              </span>
              . With years of experience, I'm dedicated to improving lives
              through precise diagnosis and personalized treatment.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8 mt-3">
              <Link
                href="#contact"
                scroll={true}
                className="uppercase rounded-lg flex items-center gap-2 border border-amber-500 px-5 py-3 transition-all duration-300 bg-gradient-to-r from-amber-900 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-500 hover:text-black font-serif shadow-md"
              >
                Let's Connect With Me
              </Link>
              <div className="mt-[-30px]">
                <Social />
              </div>
            </div>
          </div>
          <div>
            <ProfilePhoto userId={userId} />
          </div>
        </div>
        <PhotoGallery />
      </div>
      <hr />
      <div id="contact">
        <Contact />
      </div>
    </section>
  );
}