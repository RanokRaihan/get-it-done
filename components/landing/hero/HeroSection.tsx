"use client";

import {
  ArrowRight,
  Briefcase,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tasks?searchTerm=${encodeURIComponent(searchQuery)}`);
    }
  };

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
          <div className="text-center lg:text-left">
            {/* Catchy Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-8 shadow-sm border border-blue-200 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
              The Future of Getting Things Done
            </div>

            {/* Headline with linear Text */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-blue-800 to-purple-900 mb-6 leading-tight pb-2">
              Your To-Do List, <br />
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
                Done.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with skilled helpers in your neighborhood instantly. From
              home repairs to web development, we make it safe, fast, and easy.
            </p>

            {/* Enhanced Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative max-w-lg mx-auto lg:mx-0 mb-10 group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative flex items-center bg-white border border-gray-200 shadow-xl rounded-full p-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="What do you need help with today?"
                  className="flex-1 px-4 py-3 outline-none text-lg text-gray-700 bg-transparent placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Colorful Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                onClick={() => router.push("/post-task")}
                className="px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Post a Task for Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-8 py-4 rounded-xl bg-white border-2 border-blue-100 text-blue-700 font-bold shadow-sm hover:border-blue-300 hover:bg-blue-50/50 hover:-translate-y-0.5 transition-all"
              >
                Become a Helper
              </button>
            </div>
          </div>

          {/* Right Column: Enhanced Visual Trust Signals */}
          <div className="relative hidden lg:block lg:ml-10">
            {/* A colorful glow behind the cards */}
            <div className="absolute inset-0 bg-linear-to-tr from-blue-200 to-purple-200 blur-[60px] opacity-40 rounded-full z-0"></div>

            {/* Main Visual Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-2xl relative z-10 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      Task Completed
                    </h3>
                    <p className="text-sm text-gray-500">
                      Just now • New York, NY
                    </p>
                  </div>
                </div>
                <span className="text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                  +$120.00
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full w-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600 font-medium mt-3 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Payment released securely to helper
              </p>
            </div>

            {/* Floating Badge 1 - Enhanced */}
            <div className="absolute -top-8 -right-6 bg-white/90 backdrop-blur p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-blue-50 flex items-center gap-4 animate-bounce-slow z-20">
              <div className="p-3 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">Secure</p>
                <p className="text-sm font-medium text-blue-600">
                  Escrow Payments
                </p>
              </div>
            </div>

            {/* Floating Badge 2 - Enhanced */}
            <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-purple-50 flex items-center gap-4 z-20">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-gray-100 to-gray-300 shadow-sm flex items-center justify-center text-sm font-bold text-gray-600`}
                  >
                    {4 - i}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">500+ Helpers</p>
                <p className="text-sm font-medium text-purple-600">
                  Verified & Ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
