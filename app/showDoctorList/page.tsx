"use client";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  specialization?: string;
  role?: string;
};

const ShowDoctorList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            {user.specialization && <p>Specialization: {user.specialization}</p>}
            {user.role && <p>Role: {user.role}</p>}

            <div className="flex gap-4">
          <div className="border p-1">
            Block
          </div>
          <div className="border p-1">
            Send Email
          </div>
        </div>
          </div>
        ))}
    
      </div>
    </div>
  );
};

export default ShowDoctorList;
