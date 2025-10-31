"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Type the props for children
interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.5, ease: "easeInOut" },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="h-screen w-screen fixed top-0 left-0 bg-primary pointer-events-none"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { PageTransition };
