"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

interface ContactFormData {
  name: string;
  email: string;
  address?: string;
  phoneNo?: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});
  const router = useRouter();
  const params = useParams();
  const doctorId = params?.userId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId) {
      setSubmitStatus({ success: false, message: 'Doctor ID is missing.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch(`/api/contact?userId=${doctorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send appointment request');

      setSubmitStatus({ success: true, message: 'Appointment request sent successfully!' });
      setFormData({ name: '', email: '', address: '', phoneNo: '', message: '' });
    } catch (error: any) {
      setSubmitStatus({ success: false, message: error.message || 'Failed to send request' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative border-1 sm:border-2 border-blue-500 rounded-2xl min-h-screen sm:min-h-[20vh] 
      w-full sm:p-15 sm:pt-18 sm:w-3/4 mx-auto mt-3 bg-gradient-to-br from-[#d0f4de] via-[#fef9ef] to-[#fcbf49] 
      flex items-center justify-center xl:p-6 p-2 overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-300 rounded-full opacity-20 blur-3xl z-0"></div>

        <div className="relative z-10 w-full sm:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/40 
          backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/50">

          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-between space-y-8 sm:items-start"
          >
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-serif">
                Book an Appointment
              </h2>
              <p className="text-gray-700 mb-4">
                <FiPhone className="inline mr-2" />
                <span className="font-medium">+8801234567890</span>
                <br />
                <span className="text-sm">Available from 10 AM to 6 PM</span>
              </p>
            </div>

            {/* Doctor Image */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 relative overflow-hidden shadow-xl rounded-full border-4 border-white">
              <Image
                src="/contactDr.png"
                priority
                quality={100}
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF className="text-blue-600 text-xl" />, url: "https://facebook.com" },
                { icon: <FaInstagram className="text-pink-500 text-xl" />, url: "https://instagram.com" },
                { icon: <FaLinkedinIn className="text-blue-700 text-xl" />, url: "https://linkedin.com" },
                { icon: <FaYoutube className="text-red-600 text-xl" />, url: "https://youtube.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/70 p-3 rounded-full shadow-md hover:scale-110 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {submitStatus.message && (
              <div className={`p-3 rounded-xl ${
                submitStatus.success 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <FormField
              icon={<FiUser className="text-gray-500" />}
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormField
              icon={<FiMail className="text-gray-500" />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              icon={<FiMapPin className="text-gray-500" />}
              label="Address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleChange}
            />

            <FormField
              icon={<FiPhone className="text-gray-500" />}
              label="Phone Number"
              name="phoneNo"
              type="tel"
              value={formData.phoneNo || ''}
              onChange={handleChange}
            />

            <div>
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <FiMessageSquare className="mr-2 text-gray-500" />
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/70 shadow-md"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Request Appointment'}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}

// Reusable form field component
function FormField({ icon, label, name, type, value, onChange, required = false }: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center text-gray-800 font-medium mb-1">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/70 shadow-md"
      />
    </div>
  );
}