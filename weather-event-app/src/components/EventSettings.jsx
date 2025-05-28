import { Calendar, Clock } from "lucide-react";
import { getDayOptions, getTimeRangeOptions } from "../utils/dateHelpers";

export const EventSettings = ({
  selectedDay,
  selectedTimeRange,
  onDayChange,
  onTimeRangeChange,
}) => {
  const dayOptions = getDayOptions();
  const timeRangeOptions = getTimeRangeOptions();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Event Day
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-[#8b5cf6]/20 rounded-lg transition-colors group-focus-within:bg-[#8b5cf6]/30">
            <Calendar className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <select
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full pl-14 pr-10 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl font-medium text-white appearance-none cursor-pointer transition-all duration-200 hover:border-gray-600 focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20 focus:outline-none focus:bg-gray-900/70"
          >
            <option value="">Select a day</option>
            {dayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Time Range
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-[#06b6d4]/20 rounded-lg transition-colors group-focus-within:bg-[#06b6d4]/30">
            <Clock className="w-5 h-5 text-[#06b6d4]" />
          </div>
          <select
            value={selectedTimeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="w-full pl-14 pr-10 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl font-medium text-white appearance-none cursor-pointer transition-all duration-200 hover:border-gray-600 focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20 focus:outline-none focus:bg-gray-900/70"
          >
            <option value="">All day</option>
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
