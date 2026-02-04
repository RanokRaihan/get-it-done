"use client";

import { Menu, X, Zap } from "lucide-react"; // Ensure you have lucide-react installed
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to handle scroll state for the glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
              <Zap size={20} className="fill-current" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear  -to-r from-gray-900 to-gray-700">
              GetItDone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/tasks"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Browse Tasks
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              How it Works
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Log In
            </Link>
            <button
              onClick={() => router.push("/register")}
              className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link
              href="/tasks"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Browse Tasks
            </Link>
            <Link
              href="/how-it-works"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              How it Works
            </Link>
            <hr className="border-gray-100" />
            <Link
              href="/login"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="p-2 text-center bg-blue-600 text-white rounded-lg font-medium"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
