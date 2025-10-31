'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiUser, FiClock, FiCheck, FiX, FiCalendar, FiMessageSquare } from 'react-icons/fi';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  message?: string;
  doctorMessage?: string;
  date?: string;
  time?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

interface AppointmentStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export default function AppointmentList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/users/${userId}/appointments`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch appointments');
      }

      const data = await res.json();
      const appointments = data.appointments || [];

      setContacts(appointments);
      setStats({
        total: appointments.length,
        pending: appointments.filter((c: Contact) => c.status === 'pending').length,
        accepted: appointments.filter((c: Contact) => c.status === 'accepted').length,
        rejected: appointments.filter((c: Contact) => c.status === 'rejected').length,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error loading appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchAppointments();
  }, [userId]);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedDate('');
      setSelectedTime('');
      setMessage('');
    }
  }, [isModalOpen]);

  const handleStatusChange = async (contact: Contact, newStatus: 'accepted' | 'rejected') => {
    if (!userId || !contact._id) {
      setError('Missing required IDs');
      return;
    }

    try {
      if (newStatus === 'accepted') {
        setCurrentContact(contact);
        setIsModalOpen(true);
      } else {
        setUpdatingStatus(contact._id);
        const response = await fetch(`/api/appointments/${contact._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus, userId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update status');
        }

        await fetch('/api/sendEmails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            to: contact.email,
            subject: 'Appointment Rejected',
            html: `<p>Your appointment request has been <strong>rejected</strong>.</p>`,
          }),
        });

        fetchAppointments();
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentContact || !userId) return;

    try {
      const response = await fetch(`/api/appointments/${currentContact._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'accepted',
          userId,
          date: selectedDate,
          time: selectedTime,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to accept appointment');
      }

      await fetch('/api/sendEmails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          to: currentContact.email,
          subject: 'Appointment Accepted',
          html: `
            <p>Your appointment has been <strong>accepted</strong>.</p>
            <p><strong>Date:</strong> ${selectedDate}</p>
            <p><strong>Time:</strong> ${selectedTime}</p>
            ${message ? `<p><strong>Doctor's Note:</strong> ${message}</p>` : ''}
          `,
        }),
      });

      fetchAppointments();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : 'Failed to accept appointment');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Error Loading Appointments</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen text-center p-4"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">No Appointments Found</h2>
        <p className="text-gray-600  dark:text-white">You don't have any appointments yet.</p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-[#101828]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800  dark:text-white">Appointment List</h1>
            <p className="text-gray-600 mt-2  dark:text-white">
              {stats.total} appointment{stats.total !== 1 ? 's' : ''} found
              {stats.pending > 0 && <span className="ml-2 text-blue-600">({stats.pending} pending)</span>}
            </p>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-md p-6 my-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Appointment Summary</h2>
          <div className="space-y-6">
            {Object.entries({
              total: { label: 'Total Appointments', color: 'bg-blue-500 ' },
              pending: { label: 'Pending Appointments', color: 'bg-yellow-500' },
              accepted: { label: 'Accepted Appointments', color: 'bg-green-500' },
              rejected: { label: 'Rejected Appointments', color: 'bg-red-500' },
            }).map(([key, { label, color }]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium dark:text-black ">{label}</span>
                  <span className="font-bold text-white border rounded-full w-8 h-8 flex items-center justify-center bg-purple-500">
  {stats[key as keyof AppointmentStats]}
</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${color} h-2 rounded-full`}
                    style={{ width: `${(stats[key as keyof AppointmentStats] / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`rounded-xl p-6 shadow-md flex flex-col ${
                contact.status === 'accepted'
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : contact.status === 'rejected'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-full mr-4 ${
                  contact.status === 'accepted' ? 'bg-green-100' :
                  contact.status === 'rejected' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <FiUser className={`text-xl ${
                    contact.status === 'accepted' ? 'text-green-600' :
                    contact.status === 'rejected' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiClock className="mr-1" />
                    <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-grow">
                <div className="flex items-start">
                  <FiMail className="text-gray-500 mr-3 mt-1" />
                  <span className="text-gray-700">{contact.email}</span>
                </div>
                <div className="flex items-start">
                  <FiPhone className="text-gray-500 mr-3 mt-1" />
                  <span className="text-gray-700">{contact.phoneNo}</span>
                </div>
                <div className="flex items-start">
                  <FiMapPin className="text-gray-500 mr-3 mt-1" />
                  <span className="text-gray-700">{contact.address}</span>
                </div>
                <div className="flex items-start border-1 border-blue rounded-2xl p-4">
                  <FiMessageSquare className="text-gray-500 mr-3 mt-1" />
                  <span className="text-gray-700">{contact.message}</span>
                </div>

                {contact.status === 'accepted' && (
                  <>
                    {contact.date && contact.time && (
                      <div className="flex items-start">
                        <FiCalendar className="text-gray-500 mr-3 mt-1" />
                        <span className="text-gray-700">
                          {new Date(contact.date).toLocaleDateString()} at {contact.time}
                        </span>
                      </div>
                    )}
                    {contact.doctorMessage && (
                      <div className="flex items-start">
                        <FiMessageSquare className="text-gray-500 mr-3 mt-1 mb-4" />
                        <span className="text-gray-700">hello {contact.doctorMessage}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              {contact.status === 'pending' && (
  <div className="flex space-x-2 mt-6">
    <button
      onClick={() => handleStatusChange(contact, 'accepted')}
      className="flex-1 flex items-center justify-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
    >
      <FiCheck className="mr-2" /> Accept
    </button>
    <button
      onClick={() => handleStatusChange(contact, 'rejected')}
      className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
    >
      <FiX className="mr-2" /> Reject
    </button>
  </div>
)}



{contact.status === 'accepted' && (
  <div className="mt-4 pt-4 border-t border-gray-200 text-right space-y-2">
    {/* 1. Accepted Badge */}
    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
      Accepted
    </span>

    {/* 2. Booking Details */}
    <div className="text-sm text-gray-700 dark:text-gray-300">
      <p>Book Time: 12:00 AM</p>
      <p>Date: 12/03/2025</p>
    </div>

    {/* 3. Updated Time */}
    {contact.updatedAt && (
      <p className="text-xs text-gray-500 mt-1">
        {new Date(contact.updatedAt).toLocaleString()}
      </p>
    )}
  </div>
)}

{contact.status === 'rejected' && (
  <div className="mt-4 pt-4 border-t border-gray-200 text-right">
    {/* Only show Rejected Badge */}
    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
      Rejected
    </span>

    {/* Updated Time */}
    {contact.updatedAt && (
      <p className="text-xs text-gray-500 mt-1">
        {new Date(contact.updatedAt).toLocaleString()}
      </p>
    )}
  </div>
)}



        
            </motion.div>
          ))}
        </motion.div>
      
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <FiCalendar className="mr-2" /> Schedule Appointment
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full border p-2 rounded-lg"
              min={new Date().toISOString().split('T')[0]}
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="w-full border p-2 rounded-lg"
            />
            <textarea
              placeholder="Additional message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border p-2 rounded-lg"
            ></textarea>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}