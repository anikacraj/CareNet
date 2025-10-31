'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function UserDrawer() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const userLinks = session?.user
    ? [
        { name: 'My Profile', path: `/${session.user.id}` },
        { name: 'Edit Profile', path: `/login?callbackUrl=/${session?.user?.id}/editProfile` },
        { name: 'Appointment List', path: `/login?callbackUrl=/${session?.user?.id}/appointmentList` },
      ]
    : [
        { name: 'Sign In', path: '/login' },
        { name: 'Register', path: '/register' },
      ];

  return (
    <>
      {/* Toggle Button */}
      <button onClick={toggleDrawer} className="p-2 text-2xl text-black dark:text-white z-[9999]">
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={toggleDrawer} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full '
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleDrawer}>❌</button>
        </div>

        <ul className="flex flex-col p-4 space-y-2 text-base dark:text-white">
          <li>
            <Link
              href="/"
              onClick={toggleDrawer}
              className={`block px-3 py-2 rounded-md font-medium ${
                pathname === '/' ? 'bg-blue-500 text-white dark:text-white' : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/demo"
              onClick={toggleDrawer}
              className={`block px-3 py-2 rounded-md font-medium dark:text-white  ${
                pathname === '/demo' ? 'bg-blue-500 text-white dark:text-white' : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Demo Profile
            </Link>
          </li>

          {userLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={toggleDrawer}
                className={`block px-3 py-2 rounded-md font-medium dark:text-white  ${
                  pathname === link.path
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {session?.user && (
            <li>
              <button
                onClick={() => {
                  signOut();
                  toggleDrawer();
                }}
                className="block px-3 py-2 rounded-md font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
