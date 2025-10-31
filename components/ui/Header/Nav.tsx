"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export default function Nav() {
  const { data: session } = useSession()
  const pathname = usePathname()

  // Use the real user ID if logged in, else a fallback ID like "demo"
  const userId = session?.user?.id || " "

  const links = [
    { name: "Home", path: `/${userId}` },
    { name: "About Me", path: `/${userId}/about` },
    { name: "Work", path: `/${userId}/work` },
    { name: "Chamber", path: `/${userId}/chamber` },
    
 
  ]

  

  return (
    <nav className="flex gap-8 flex-wrap">
      
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={cn(
            "capitalize text-lg md:text-xl font-medium transition-all duration-300",
            "hover:text-blue-600 dark:hover:text-blue-300",
            link.path === pathname
              ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400"
              : "text-gray-700 dark:text-gray-300"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
