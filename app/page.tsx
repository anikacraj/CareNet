"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import Header from "@/components/ui/Header/HomePageHeader";
import Footer from "@/components/ui/Footer";
import DesktopSlider from "@/components/ui/DesktopSlider";
import MobileSlider from "@/components/ui/MobileSlider";
import adminAboutUs from "@/components/ui/adminAboutUs";
import AboutUsSection from "@/components/ui/adminAboutUs";
import { useEffect, useState } from "react";
import Link from "next/link";



const sentence = "Your journey to better healthcare starts now.";

const container = {
  hidden: { opacity: 1 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  }),
};

const child = {
  hidden: { opacity: 0, y: `0.25em` },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export default function Home() {
  const { data: session, status } = useSession();
  const controls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      while (true) {
        await controls.start("hidden");
        await controls.start("visible");
        await new Promise((res) => setTimeout(res, 2000)); // wait before restarting
      }
    };

    loopAnimation();
  }, [controls]);

  return (
       <div className="w-full min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-20 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center sm:text-left max-w-xl space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            {session?.user ? (
              <>
                Welcome back,{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {session.user.name}
                </span>
              </>
            ) : (
              <>
                Bridging Care & <br className="sm:hidden" />
                Connection at{" "}
                <span className="text-blue-600">
                  <span className="dark:text-white text-black">🩺DR</span> Port.
                </span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium"
          >
            A modern platform where certified doctors meet patients in need —
            fast, secure, and human-centered care starts here.
          </motion.p>

          {!session?.user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex justify-center sm:justify-start gap-4"
            >
              <Link
                href="/register"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Join as Doctor
              </Link>
              <Link
                href="/patientHome"
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Go Patient Page
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-[280px] h-[280px] sm:w-[450px] sm:h-[380px] shadow-2xl rounded-xl"
        >
          <Image
            src="/contactDr.png"
            alt="Doctor Illustration"
            fill
            priority
            className="object-cover rounded-xl"
          />
        </motion.div>
      </section>

      {/* Why DR Port Section */}
      <section className="py-16 px-6 sm:px-16 bg-blue-50 dark:bg-gray-900 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-6"
        >
          Why DR Port?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Whether you're a doctor seeking visibility or a patient seeking care,
          DR Port connects you to what matters —{" "}
          <span className="font-semibold">
            real-time interaction, verified professionals, and accessible
            medical support
          </span>{" "}
          — anytime, anywhere.
        </motion.p>
      </section>

      {/* Slider Section */}
      <section className="my-14 px-4 sm:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400"
        >
          Meet Verified Doctors Trusted by Thousands
        </motion.h2>
        <DesktopSlider />
        <MobileSlider />
      </section>

      {/* About Us Section */}
      <div className="mt-8">
        <AboutUsSection />
      </div>

      {/* CTA Section */}
      <section className="mt-16 px-6 sm:px-16 py-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 text-center rounded-t-3xl">
        <motion.h3
          className="text-3xl font-bold mb-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {sentence.split("").map((char, index) => (
            <motion.span key={index} variants={child}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h3>

        <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
          Join our community — whether to heal or to help.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {!session?.user && (
            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Doctor Sign Up
            </Link>
          )}
          <Link
            href="/patientHome"
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-blue-600 text-blue-700 dark:text-blue-300 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            Patient Access
          </Link>
        </div>
      </section>
    </div>
  );
}
