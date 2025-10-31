'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Dummy data for example
const work = [
  {
    num: '1',
    role: 'Head of Doctor',
    college: 'Usmani Medical College',
    place:"Sylhet",
    Day:"Sunday to Wednesday",
    time:"7.00AM to 2.00PM"
  },
  {
    num: '2',
    role: 'Senior Consultant',

    college: 'Sylhet City Clinic',
    place:"Sylhet",
   Day:"Sunday to Wednesday",
    time:"7.00AM to 2.00PM"
  },
  {
    num: '3',
    role: 'Visiting Surgeon',
    college: 'Green Life Hospital',
    place:"Sylhet",
    Day:"Sunday to Wednesday",
    time:"7.00AM to 2.00PM"
  },
];

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-min w-full sm:w-3/4 mx-auto bg-gradient-to-br border-2 rounded-2xl border-amber-500 from-white to-green-50 py-10 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-green-700 mb-12">
        MY WORK 
      </h1>
<hr />
<br />
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {mounted &&
          work.map((wk, num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              className="bg-white shadow-xl rounded-2xl p-6 border border-green-100 hover:shadow-green-200 transition-all duration-300"
            >
              <h2 className="text-xl font-extrabold text-blue-900 mb-2">
                {wk.role}
              </h2>
              <p className="text-gray-600 font-bold">{wk.college}</p>
              <p className="text-gray-900 font-semibold" >{wk.place}</p>
              <p className="text-gray-500 italic font-serif">{wk.Day}</p>
              <p className="text-gray-500 italic font-stretch-50%">{wk.time}</p>
            </motion.div>
          ))}
          
      </div>
    </div>
  )
}
