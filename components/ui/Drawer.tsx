'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { CiMenuFries } from 'react-icons/ci';

export default function Drawer({ links }: { links: { name: string; path: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Toggle Button */}
      <button onClick={toggleDrawer} className="p-2 text-2xl text-black dark:text-white">
        {/* <CiMenuFries /> */}
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleDrawer}>❌</button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={toggleDrawer}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.path
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
