'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutUsSection() {
  return (
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  viewport={{ once: true }}
  className="w-full py-16 
             bg-gradient-to-r from-blue-50 via-white to-blue-50 
             dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
             transition-colors duration-500"
>
  <div className="container mx-auto px-6 text-center">
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Learn More About Us
    </motion.h2>
    <motion.p
      className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Discover our mission, values, and the people who make it all possible.
      We are dedicated to providing top-notch services with care, compassion, and expertise.
    </motion.p>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Link
        href="/AdminAboutUs"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
      >
        About Us
      </Link>
    </motion.div>
  </div>
</motion.div>

  );
}
