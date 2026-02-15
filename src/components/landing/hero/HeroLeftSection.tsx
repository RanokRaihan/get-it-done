import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroLeftSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tasks?searchTerm=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="text-center lg:text-left">
      {/* Catchy Badge */}
      {/* <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-8 shadow-sm border border-blue-200 backdrop-blur-sm">
        <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
        The Future of Getting Things Done
      </div> */}

      {/* Headline with linear Text */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-blue-800 to-purple-900 mb-6 leading-tight pb-2">
        Need a hand? <br />
        <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
          We got you.
        </span>
      </h1>

      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Connect with skilled helpers in your neighborhood instantly. From home
        repairs to web development, we make it safe, fast, and easy.
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
        <Link
          href="/post-task"
          className="px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          Post a Task for Free
          <ArrowRight className="w-5 h-5" />
        </Link>

        <Link
          href="/register"
          className="px-8 py-4 rounded-xl bg-white border-2 border-blue-100 text-blue-700 font-bold shadow-sm hover:border-blue-300 hover:bg-blue-50/50 hover:-translate-y-0.5 transition-all"
        >
          Become a Helper
        </Link>
      </div>
    </div>
  );
};

export default HeroLeftSection;
