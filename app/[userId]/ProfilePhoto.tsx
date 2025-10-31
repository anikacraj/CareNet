"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProfilePhotoProps {
  userId: string;
}

const ProfilePhoto = ({ userId }: ProfilePhotoProps) => {
  const [profilePhoto, setProfilePhoto] = useState<string>("/Drprofile.png"); // Default profile photo

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (data?.profilePhoto) {
          setProfilePhoto(data.profilePhoto);
        }
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    };

    if (userId) fetchProfilePhoto();
  }, [userId]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1, duration: 1, ease: "easeIn" } }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 1, ease: "easeInOut" } }}
          className="relative w-[298px] h-[298px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden border-4 border-blue-500 shadow-md"
        >
          <Image 
            src={profilePhoto}
            alt="Profile Photo"
            fill
            priority
            quality={100}
            className="object-cover rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePhoto;