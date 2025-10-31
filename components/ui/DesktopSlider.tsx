'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const images = [
  '/ramaBiswas.png',
  '/Dr.Shahedul.png',
  '/DrKazi.png',
  
];

export default function DesktopSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setIndex((index - 1 + images.length) % images.length);
  const nextSlide = () => setIndex((index + 1) % images.length);

  return (
    <div className="hidden md:flex justify-center top-0 relative sm:w-[750px] mx-auto z-10">
      <div className="relative h-[460px] sm:w-[1000px] rounded-2xl overflow-hidden shadow-2xl
       border border-white z-10">
        <Image
          src={images[index]}
          alt="Slide"
          fill
          className="object-cover transition-all duration-500 rounded-2xl"
          priority
        />
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-20 hover:scale-110 transition"
        >
          <ChevronLeft className="text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-20 hover:scale-110 transition"
        >
          <ChevronRight className="text-black" />
        </button>
      </div>
    </div>
  );
}
