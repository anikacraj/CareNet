"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import UserPageHeader from "@/components/ui/Header/UserPageHeader";
import Header from "@/components/ui/Header/HomePageHeader";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  specialization?: string;
  profilePhoto?: string;
  phoneNo?: string;
  role?: string;
  adminVerified?:boolean;
};

const ShowDoctorList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5 },
    }),
  };

  const skeletons = Array(6).fill(0);

  return (
 <div className="mt-10">
<div className="flex justify-between mb-7">
<Link className='ml-3'  href="/">
          <h1 className="text-3xl sm:text-4xl font-bold cursor-pointer hover:text-blue-400 transition duration-300">
            🩺DR <span className="text-blue-600">Port.

              
            </span>
          </h1>
        </Link>

        <Link className="mr-7" href="/">Home</Link>
</div>

     <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Find Your Doctor
      </h1>

      <input
        type="text"
        placeholder="🔍 Search by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 mb-8 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletons.map((_, i) => (
            <motion.div
              key={i}
              className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-5/6" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
              custom={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-900 border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
              onClick={() => router.push(`/${user._id}`)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePhoto || "/default-doctor.png"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user.name}
                     {user.adminVerified && (
          
          <span className="relative ml-3   group inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-600 shadow-md cursor-pointer">
            <ShieldCheck  className="w-[35px] h-[24px]  text-white" />
            
            <span className="absolute bottom-full mb-1 hidden group-hover:flex text-xs text-white bg-gray-900 px-2 py-1 rounded shadow-lg whitespace-nowrap">
              Verified Medical Professional
            </span>
          </span>
        )}
                  </h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {user.specialization || "General Practitioner"}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Email:</strong> {user.email}</p>
                {user.phoneNo && <p><strong>Phone:</strong> {user.phoneNo}</p>}
                {user.role && <p><strong>Role:</strong> {user.role}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No doctors found.</p>
      )}
    </div>
 </div>
  );
};

export default ShowDoctorList;
