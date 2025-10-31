//components\ui\AiAssistant.tsx

'use client';

import React, { useState } from 'react';
import { callGroqAI, initialMessages } from '@/utils/callGroq';
import { getWeatherDetails } from '@/utils/tools';
import { motion } from 'framer-motion';

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input };
  const newMessages = [...messages, userMessage];
  setMessages(newMessages);
  setLoading(true);
  setInput('');

  try {
    const result = await callGroqAI(newMessages, process.env.NEXT_PUBLIC_GROQ_API_KEY!);
    const parsed = JSON.parse(result);

    if (parsed.type === 'output') {
      const aiMessage = { role: 'assistant', content: parsed.output };
      setMessages([...newMessages, aiMessage]);
    } else if (parsed.type === 'action') {
      const observation = getWeatherDetails(parsed.input);
      const obsMsg = {
        role: 'user',
        content: JSON.stringify({ type: 'observation', observation })
      };
      const updatedMessages = [...newMessages, { role: 'assistant', content: parsed }, obsMsg];

      const result2 = await callGroqAI(updatedMessages, process.env.NEXT_PUBLIC_GROQ_API_KEY!);
      const finalParsed = JSON.parse(result2);

      const finalAIMessage = { role: 'assistant', content: finalParsed.output };
      setMessages([...updatedMessages, finalAIMessage]);
    }
  } catch (err: any) {
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: `❌ Error: ${err.message}` }
    ]);
  }

  setLoading(false);
};


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">
        🧠 Mental Health & Motivation AI
      </h2>

      <div className="h-[400px] overflow-y-auto bg-gray-100 dark:bg-gray-900 rounded-lg p-4 space-y-3 mb-4">
{messages
  .filter(msg => msg.role !== 'system') // ✅ Exclude system messages
  .map((msg, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-md ${
        msg.role === 'user'
          ? 'ml-auto bg-blue-600 text-white rounded-br-none'
          : 'mr-auto bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'
      }`}
    >
      {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
    </motion.div>
))}


        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-sm italic"
          >
            Thinking...
          </motion.div>
        )}
      </div>
<p className='text-center mb-2 '>How can I help you today?</p>
      <div className="flex">
    <textarea

  value={input}
  onChange={e => setInput(e.target.value)}
  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 text-black focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
  placeholder="Type your question..."
/>
        
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 h-[40px] ml-2  mt-3 w-[100px] py-2 rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
