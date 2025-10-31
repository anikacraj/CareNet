"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import UserDrawer from "../UserDrawer";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Transparent Header Overlay */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/70 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🩺</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-500 transition duration-300">
              Care Connect
            </h1>
          </Link>

          {/* Desktop Nav */}
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden xl:flex gap-8 items-center text-lg font-semibold"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/patientHome", label: "Patient Access" },
            ].map((item) => (
              <motion.li
                key={item.href}
                whileHover={{ scale: 1.08 }}
                className="relative group text-gray-800 dark:text-gray-200 transition"
              >
                <Link href={item.href}>{item.label}</Link>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.li>
            ))}

            <motion.li
              whileHover={{ scale: 1.08 }}
              className="relative group flex items-center gap-1 text-blue-700 dark:text-blue-300 cursor-pointer"
            >
              <Link href="/MindMateAI" className="flex items-center">
                🤖 MindMate AI
              </Link>
              <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-500 w-0 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>

            {session?.user && (
              <>
                <motion.li
                  whileHover={{ scale: 1.08 }}
                  className="relative group text-gray-800 dark:text-gray-200"
                >
                  <Link href={`/${session?.user?.id}`}>My Profile</Link>
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-500 w-0 transition-all duration-300 group-hover:w-full"></span>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.08 }}
                  className="relative group text-gray-800 dark:text-gray-200"
                >
                  <Link href={`/login?callbackUrl=/${session?.user?.id}/editProfile`}>Edit Profile</Link>
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-500 w-0 transition-all duration-300 group-hover:w-full"></span>
                </motion.li>
              </>
            )}

            {/* Auth Buttons */}
            <motion.li whileHover={{ scale: 1.08 }} className="relative">
              {session?.user ? (
                <div className="relative">
                  <button onClick={() => setShowMenu(!showMenu)}>
                    <FaAddressBook className="w-8 h-8 text-gray-700 dark:text-white" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                      <ul className="text-sm text-gray-800 dark:text-gray-100">
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <Link href={`/login?callbackUrl=/${session?.user?.id}/appointmentList`}>Appointment List</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <Link href={`/login?callbackUrl=/${session?.user?.id}/blog`}>Create Blog</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-gray-800 dark:text-gray-100 hover:text-blue-500">
                  Sign In
                </Link>
              )}
            </motion.li>

            {!session?.user && (
              <motion.li
                whileHover={{ scale: 1.08 }}
                className="relative group text-gray-800 dark:text-gray-200"
              >
                <Link href="/register">Register</Link>
                <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-500 w-0 transition-all duration-300 group-hover:w-full"></span>
              </motion.li>
            )}
          </motion.ul>

          {/* Mobile Drawer */}
          <nav className="xl:hidden">
            <UserDrawer />
          </nav>
        </div>
      </header>
    </>
  );
}
