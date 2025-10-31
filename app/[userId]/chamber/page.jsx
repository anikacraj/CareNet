"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const chambers = [
  {
    num: "1",
    place: "Sylhet",
    Day: "Sunday to Wednesday",
    time: "7.00AM to 2.00PM",
    call:"01873682767( 8.00 AM -- OnDate ) "
    
  },
  {
    num: "2",
    place: "Sylhet",
    Day: "Sunday to Wednesday",
    time: "7.00AM to 2.00PM",
     call:"01873682767( 8.00 AM -- OnDate ) "
  },
  {
    num: "3",
    place: "Sylhet",
    Day: "Sunday to Wednesday",
    time: "7.00AM to 2.00PM",
     call:"01873682767( 8.00 AM -- OnDate ) "
  },
];

export default function Page() {
  return (
    <div className="min-h-screen sm:min-h-[30vh] sm:mt-10 border-2 border-blue-400 rounded-2xl w-full sm:w-3/4 mx-auto bg-gradient-to-br from-blue-50 to-white p-6 xl:p-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl xl:text-5xl font-bold text-center text-blue-700 mb-12"
      >
        Doctor's Chambers
      </motion.h1>
 <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-8 max-w-7xl mx-auto">
        {chambers.map((chamber, index) => (
          <motion.div
            key={chamber.num}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500"
          >
            <h2 className="text-xl xl:text-2xl font-semibold text-blue-600 mb-4">
              Chamber #{chamber.num}
            </h2>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{chamber.place}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>{chamber.Day}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaClock className="text-blue-500" />
              <span>{chamber.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaClock className="text-blue-500" />
              <span>Phone : {chamber.call}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
