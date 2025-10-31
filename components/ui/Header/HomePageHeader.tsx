// components/Header.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import UserDrawer from "../UserDrawer";
import { motion } from "framer-motion";
import { BrainCircuit } from 'lucide-react';
import { Bot } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  // Set user from session
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
    {/* Header Wrapper */}
    <header className="w-full py-6 xl:py-8 mt-10 mb-10 px-4 text-accent bg-white dark:bg-black">
      <div className="max-w-[1200px] mx-auto flex justify-around items-center">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl sm:text-4xl font-bold cursor-pointer hover:text-blue-400 transition duration-300">
            🩺DR <span className="text-blue-600">Port.

              
            </span>
          </h1>
        </Link>
  
        {/* Desktop Navigation */}
        <motion.ul
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="hidden xl:flex gap-8 items-center text-lg font-semibold ml-auto"
>
  {/* Home */}
  <motion.li
    whileHover={{ scale: 1.1 }}
    className="relative group transition text-gray-800 dark:text-white"
  >
    <Link href="/">Home</Link>
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </motion.li>

  {/* Demo */}
  <motion.li
    whileHover={{ scale: 1.1 }}
    className="relative group transition text-gray-800 dark:text-white"
  >
    <Link href="/patientHome">Patient Access </Link>
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </motion.li>

 <motion.li
  whileHover={{ scale: 1.08 }}
  className="relative group flex items-center gap-2 cursor-pointer px-3 py-1 text-blue-700 dark:text-blue-300 font-semibold transition duration-300"
>
 
  <Link href="/MindMateAI" className="flex items-center">
    🤖 MindMate Al
  </Link>
  <span className="absolute left-0 -bottom-0.5 h-0.5 bg-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"></span>
</motion.li>

  {/* My Profile */}
  {session?.user && (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="relative group transition text-gray-800 dark:text-white"
    >
      <Link href={`/${session?.user?.id}`}>My Profile</Link>

      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </motion.li>
  )}

  {/* Edit Profile */}
  {session?.user && (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="relative group transition text-gray-800 dark:text-white"
    >
     <Link href={`/login?callbackUrl=/${session?.user?.id}/editProfile`}>Edit Profile</Link>
 
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </motion.li>
  )}

  {/* Sign In / Out */}
  <motion.li
    whileHover={{ scale: 1.1 }}
    className="relative group transition text-gray-800 dark:text-white"
  >
    {session?.user ? (
      // <button onClick={() => signOut()} className="text-red-600">
      <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)}>
        <FaAddressBook className="w-12 h-8 text-gray-700 dark:text-white" />
      </button>

      {showMenu && (
        <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
          <ul className="text-sm text-gray-800 dark:text-gray-100">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <Link href={`/login?callbackUrl=/${session?.user?.id}/appointmentList`}>Appointment List</Link>
            
            

            </li>

            <li>
              <Link href={`/login?callbackUrl=/${session?.user?.id}/blog`}>Create Blog</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <button onClick={() => signOut()}>
              Signout
</button>

            </li>
          </ul>
        </div>
      )}
    </div>
      
    ) : (
      <Link href="/login">Sign In</Link>
    )}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </motion.li>

  {/* Register (only for guests) */}
  {!session?.user && (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="relative group transition text-gray-800 dark:text-white"
    >
      <Link href="/register">Register</Link>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </motion.li>
  )}
</motion.ul>

  
        {/* Mobile Menu Icon */}
        <nav className="xl:hidden">
          <UserDrawer />
        </nav>
      </div>
    </header>
  </>
  
  );
}
