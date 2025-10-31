"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/ui/Footer";


import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phoneNo }),
      });

      if (response.ok) {
        toast({ title: "Account Created Successfully Check Email!" });
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNo("");
      } else {
        toast({ title: "Registration failed", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Something went wrong!", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
<>
  <div className="py-7 px-8">
    <Link href="/">
      <h1 className="text-3xl sm:text-4xl font-bold cursor-pointer hover:text-blue-400 transition duration-300 dark:hover:text-blue-300">
        🩺DR <span className="text-blue-300 dark:text-blue-500">Port.</span>
      </h1>
    </Link>
  </div>

  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
    <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          Doctor Registration
        </CardTitle>
        <CardDescription className="text-sm mt-2 text-gray-600 dark:text-gray-300">
          Create your doctor profile and connect with patients easily.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
          <Input
            id="name"
            placeholder="Dr. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="dark:text-gray-200">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="doctor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNo" className="dark:text-gray-200">Register Id </Label>
          <Input
            id="phoneNo"
            type="tel"
            placeholder="XXXXXXXXX"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </Button>
        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium dark:text-blue-400"
          >
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
</>

  );
};

export default Register;
