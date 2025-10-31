"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the callbackUrl from the query parameter
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async () => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast({ variant: "destructive", title: result.error });
    } else {
      router.replace(callbackUrl); // 🔁 Redirect to original page
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

      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
        <div className="w-full max-w-sm">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                Login to your doctor account to manage your portfolio.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="dark:text-gray-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dr@example.com"
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>

              <div className="text-sm flex justify-between text-gray-600 dark:text-gray-400">
                <Link href="/forgetPassword" className="hover:underline text-blue-600 dark:text-blue-400">
                  Forgot Password?
                </Link>
                <Link href="/register" className="hover:underline text-blue-600 dark:text-blue-400">
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
