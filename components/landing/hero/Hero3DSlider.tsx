"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Sample Data with High-Quality Images
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=1000&auto=format&fit=crop",
    title: "Furniture Assembly",
    location: "Brooklyn, NY",
    price: "$120",
    rating: 5.0,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
    title: "Home Cleaning",
    location: "Austin, TX",
    price: "$85",
    rating: 4.9,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    title: "Moving Help",
    location: "Chicago, IL",
    price: "$200",
    rating: 4.8,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=1000&auto=format&fit=crop",
    title: "Plumbing Repair",
    location: "Seattle, WA",
    price: "$150",
    rating: 5.0,
  },
];

const Hero3DSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-125 flex items-center justify-center perspective-1000">
      <AnimatePresence mode="popLayout">
        {slides.map((slide, index) => {
          // Calculate the relative position of the card based on the current index
          // We use modulo arithmetic to create a circular buffer of cards
          const offset = (index - currentIndex + slides.length) % slides.length;

          // Only render the first 3 visible cards to save performance
          if (offset > 2) return null;

          return (
            <motion.div
              key={slide.id}
              layoutId={`card-${slide.id}`}
              initial={{ scale: 0.8, opacity: 0, z: -100, y: 50 }}
              animate={{
                scale: offset === 0 ? 1 : offset === 1 ? 0.9 : 0.8,
                opacity: offset === 0 ? 1 : offset === 1 ? 0.6 : 0.3,
                zIndex: slides.length - offset,
                y: offset * 40, // Stacking effect vertically
                z: -offset * 50, // Depth effect
                rotateX: offset === 0 ? 0 : 5, // Slight tilt for background cards
              }}
              exit={{
                x: 200,
                opacity: 0,
                scale: 1,
                rotate: 20, // Rotate out effect
                transition: { duration: 0.4 },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="absolute top-10 w-[320px] md:w-95 h-112.5 bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm"
              style={{
                // Add a cool 3D shadow effect
                boxShadow:
                  offset === 0
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "none",
              }}
            >
              {/* Image Section */}
              <div className="h-3/5 w-full relative">
                <Image
                  width={520}
                  height={300}
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                  {slide.price}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 h-2/5 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {slide.title}
                    </h3>
                    <div className="flex items-center text-yellow-500 text-sm font-bold">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {slide.rating}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    {slide.location}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Status</span>
                    <span className="text-green-600 font-bold">
                      In Progress
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: offset === 0 ? "75%" : "0%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-linear-to-r from-blue-500 to-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Hero3DSlider;
