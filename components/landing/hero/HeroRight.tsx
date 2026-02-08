import { Briefcase, ShieldCheck } from "lucide-react";

const HeroRight = () => {
  return (
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
              <p className="text-sm text-gray-500">Just now • New York, NY</p>
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
          <p className="text-sm font-medium text-blue-600">Escrow Payments</p>
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
  );
};

export default HeroRight;
