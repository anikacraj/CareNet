// app/page.tsx (or your page component)
"use client"

import AiAssistant from '@/components/ui/AiAssistant';
import Header from '@/components/ui/Header/HomePageHeader';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  // Hide intro animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" dark:text-white flex flex-col">
      <Header  />

<div>

        <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f3d]"
          >
            <motion.div
              initial={{ scale: 0.7, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 360, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="text-6xl text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse">
                🤖
              </div>
              <h1 className="text-4xl font-extrabold tracking-widest text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]">
                Entering MindMate AI...
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <main >
          <AiAssistant />
        </main>
      )}
</div>
    </div>
  );
}
