// components/RouteLoader.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function RouteLoader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    loading && (
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ width: 0 }}
        transition={{ duration: 0.5 }}
      />
    )
  );
}
