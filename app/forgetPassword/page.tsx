'use client';

import { useState } from 'react';

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSendOTP = async () => {
    const res = await fetch('/api/forget-password/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await res.json();
    setMsg(data.message || data.error);
    if (res.ok) setStep(2);
  };

  const handleVerifyOTP = async () => {
    console.log("Sending:", email, otp);
    const res = await fetch('/api/forget-password/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
  
    const data = await res.json();
    console.log("Server Response:", data);
  
    if (!res.ok) {
      alert(data.error);
    } else {
      alert(data.message);
    }
  };
  
  

  const handleResetPassword = async () => {
    const res = await fetch('/api/forget-password/reset', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded">
      <h1 className="text-xl font-bold">Forget Password</h1>

      {step === 1 && (
        <>
          <input
            className="w-full p-2 border"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOTP} className="bg-blue-500 text-white p-2 w-full">Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="w-full p-2 border"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP} className="bg-green-500 text-white p-2 w-full">Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            className="w-full p-2 border"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleResetPassword} className="bg-purple-500 text-white p-2 w-full">Reset Password</button>
        </>
      )}

      {msg && <p className="text-center text-sm text-red-500">{msg}</p>}
    </div>
  );
}
