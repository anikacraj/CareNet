'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminAboutUs() {
//   const [formData, setFormData] = useState({
//     heading: '',
//     description: '',
//     mission: '',
//     vision: '',
//     team: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Submitted About Us content:', formData);
//     // TODO: Send formData to backend
//   };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-white dark:bg-gray-900 py-10 px-6 md:px-12 lg:px-24"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Admin - About Us Content Editor
      </h1>

      <form  className="max-w-3xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">Heading</label>
          <input
            type="text"
            name="heading"
            // value={formData.heading}
            // onChange={handleChange}
            placeholder="Enter heading..."
            className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            // value={formData.description}
            // onChange={handleChange}
            placeholder="Enter description..."
            className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mission */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">Mission</label>
          <input
            type="text"
            name="mission"
            // value={formData.mission}
            // onChange={handleChange}
            placeholder="Our mission is..."
            className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Vision */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">Vision</label>
          <input
            type="text"
            name="vision"
            // value={formData.vision}
            // onChange={handleChange}
            placeholder="Our vision is..."
            className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Team */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">Team Highlights</label>
          <textarea
            name="team"
            rows={3}
            // value={formData.team}
            // onChange={handleChange}
            placeholder="Brief about your team..."
            className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300 hover:bg-blue-700 shadow-md"
        >
          Save About Us Content
        </motion.button>
      </form>
    </motion.div>
  );
}
