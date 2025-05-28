import { MapPin } from "lucide-react";
import { cn } from "../utils/cn";

export const LocationInput = ({ value, onChange, error }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Event Location
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-[#6366f1]/20 rounded-lg transition-colors group-focus-within:bg-[#4f46e5]/30">
          <MapPin className="text-[#818cf8] w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter city, address, or coordinates"
          className={cn(
            "w-full pl-14 pr-4 py-4 border-2 rounded-xl font-medium text-white",
            "placeholder:text-gray-500 placeholder:font-normal",
            "transition-all duration-200",
            "hover:border-gray-600 focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20",
            "focus:outline-none",
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-700",
            "bg-gray-900/50 focus:bg-gray-900/70"
          )}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
