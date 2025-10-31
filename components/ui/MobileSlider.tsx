// components/MobileSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/anik.jpeg',
  '/DrKazi.png',
  
];

export default function MobileSlider() {
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
    <div className="md:hidden relative w-full  h-[300px] overflow-hidden">
      <img src={images[index]} alt="Slide" className="w-full h-full object-cover transition duration-500" />
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full">
        <ChevronRight />
      </button>
    </div>
  );
}
