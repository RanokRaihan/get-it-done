"use client";

import Hero3DSlider from "./Hero3DSlider";
import HeroLeftSection from "./HeroLeftSection";

const Hero = () => {
  return (
    // Changed bg-white to a subtle linear background
    <div className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32 lg:pt-28 lg:pb-48">
      {/* Colorful blurred blobs for background ambiance */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text & Search */}
          <HeroLeftSection />

          {/* Right Column: Enhanced Visual Trust Signals */}
          <Hero3DSlider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
