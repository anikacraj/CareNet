'use client';

import React, { useState } from 'react';
import { callGroqAI, initialMessages } from '@/utils/callGroq';
import { motion } from 'framer-motion';

const DoctorBlogCreator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<{ heading: string; paragraphs: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateBlog = async () => {
    if (!subject.trim() || !prompt.trim()) return;

    setLoading(true);
    setResponse(null);

    const userInput = `Task: Doctor Blog Writing\nSubject: ${subject}\nPrompt: ${prompt}\nPlease respond strictly in JSON format as described in the system prompt.`;

    try {
      const result = await callGroqAI(
        [...initialMessages, { role: 'user', content: userInput }],
        process.env.NEXT_PUBLIC_GROQ_API_KEY!
      );

      // Extract clean JSON from response
      const firstBrace = result.indexOf('{');
      const lastBrace = result.lastIndexOf('}');
      const jsonString = result.slice(firstBrace, lastBrace + 1);

      const parsed = JSON.parse(jsonString);

      if (parsed.type === 'output') {
        const blogParts = parsed.output.split('\n\n');
        const heading = parsed.heading || blogParts[0];
        const paragraphs = parsed.heading ? blogParts : blogParts.slice(1);
        setResponse({ heading, paragraphs });
      }
    } catch (err: any) {
      setResponse({
        heading: 'Error',
        paragraphs: [`❌ ${err.message}`],
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-[#f8f9fb] dark:bg-[#1e1f2f]">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-blue-400">
        🩺 Doctor AI Blog Generator
      </h2>

      <div className="grid gap-4 mb-4">
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Enter Blog Subject (e.g., Heart Disease Awareness)"
        />
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
          placeholder="Enter Prompt (e.g., Talk about symptoms, prevention, and treatment)"
        />
        <button
          onClick={handleGenerateBlog}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Blog'}
        </button>
      </div>

      {response && (
        <div className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-blue-700 dark:text-blue-300"
          >
            {response.heading}
          </motion.h3>

          {response.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="text-gray-800 dark:text-gray-300 leading-relaxed"
            >
              {para}
            </motion.p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorBlogCreator;
