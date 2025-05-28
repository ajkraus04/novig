import { useEffect } from "react";
import { useWeatherControl } from "../hooks/useWeatherControl";
import { useWeatherStore } from "../stores/weatherStore";
import { LocationInput } from "../components/LocationInput";
import { EventSettings } from "../components/EventSettings";
import { WeatherCard } from "../components/WeatherCard";
import { WeatherChart } from "../components/WeatherChart";
import {
  Loader2,
  CloudSun,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

export const Home = () => {
  const {
    location,
    selectedDay,
    selectedTimeRange,
    dates,
    locationError,
    weekOffset,
    mobileCardIndex,
    chartKey,
    setLocation,
    setSelectedDay,
    setSelectedTimeRange,
    navigateWeek,
    setMobileCardIndex,
    initializeDates,
    getSelectedTimeRangeData,
    getWeekLabel,
    getWeekDescription,
  } = useWeatherStore();

  const selectedTimeRangeData = getSelectedTimeRangeData();

  const { data, isLoading, error, handleLocationSubmit } = useWeatherControl();

  useEffect(() => {
    initializeDates();
  }, [initializeDates]);

  return (
    <div className="min-h-screen bg-[#1a1b26] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b26] to-[#16171f]" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4f46e5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <header className="text-center mb-12 animate-fade-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl shadow-dark glow-purple animate-float">
              <CloudSun className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text">
              Weather Event Planner
            </h1>
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Plan your perfect outdoor event with AI-powered weather insights
          </p>
        </header>

        <div className="glass-dark rounded-2xl shadow-dark p-6 md:p-8 mb-10 animate-fade-up animation-delay-200">
          <form
            onSubmit={handleLocationSubmit}
            className="space-y-6 md:space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <LocationInput
                value={location}
                onChange={setLocation}
                error={locationError}
              />

              <EventSettings
                selectedDay={selectedDay}
                selectedTimeRange={selectedTimeRange}
                onDayChange={(day) => setSelectedDay(day)}
                onTimeRangeChange={(range) => setSelectedTimeRange(range)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !location.trim()}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white font-semibold rounded-xl hover:from-[#4338ca] hover:to-[#8b5cf6] disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-glow flex items-center justify-center gap-3 group"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>Get Weather Forecast</span>
              {!isLoading && (
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-10 animate-fade-in flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error.message}</span>
          </div>
        )}

        {data && data.length === 2 && (
          <div className="space-y-8 md:space-y-10 animate-fade-up">
            {/* Week Navigation */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center bg-gray-900/30 rounded-2xl p-2 backdrop-blur-sm border border-gray-800/50">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                  title="Previous week"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <div className="text-center px-4 md:px-8 py-2">
                  <h2 className="text-lg md:text-xl font-display font-bold text-white mb-1">
                    {getWeekLabel(weekOffset)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {dates[0] && format(new Date(dates[0]), "MMM d")} -{" "}
                    {dates[1] && format(new Date(dates[1]), "MMM d, yyyy")}
                  </p>
                </div>

                <button
                  onClick={() => navigateWeek(1)}
                  className="p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                  title="Next week"
                >
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Mobile Card Navigation */}
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMobileCardIndex(0)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mobileCardIndex === 0
                      ? "bg-[#6366f1] text-white shadow-lg"
                      : "bg-gray-800/50 text-gray-400 hover:text-white"
                  }`}
                >
                  {getWeekDescription(0, weekOffset)}
                </button>
                <button
                  onClick={() => setMobileCardIndex(1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mobileCardIndex === 1
                      ? "bg-[#6366f1] text-white shadow-lg"
                      : "bg-gray-800/50 text-gray-400 hover:text-white"
                  }`}
                >
                  {getWeekDescription(1, weekOffset)}
                </button>
              </div>
            </div>

            {/* Weather Cards - responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mobile: Show only selected card */}
              <div
                className={`lg:block ${mobileCardIndex === 0 ? "block" : "hidden"} ${weekOffset > 0 ? "animate-slide-left" : "animate-slide-right"}`}
              >
                <WeatherCard
                  data={data[0]}
                  timeRange={selectedTimeRangeData}
                  isCurrentWeek={true}
                  weekDescription={getWeekDescription(0, weekOffset)}
                />
              </div>
              <div
                className={`lg:block ${mobileCardIndex === 1 ? "block" : "hidden"} ${weekOffset > 0 ? "animate-slide-left" : "animate-slide-right"}`}
              >
                <WeatherCard
                  data={data[1]}
                  timeRange={selectedTimeRangeData}
                  isCurrentWeek={false}
                  weekDescription={getWeekDescription(1, weekOffset)}
                />
              </div>
            </div>

            {/* Charts - responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`lg:block ${mobileCardIndex === 0 ? "block" : "hidden"} card-glass rounded-2xl shadow-dark p-6 md:p-8 group hover:shadow-xl transition-all duration-300 ${weekOffset > 0 ? "animate-slide-left" : "animate-slide-right"}`}
              >
                <h3 className="text-lg md:text-xl font-display font-bold mb-6 flex items-center gap-3 text-white">
                  <span className="w-2 h-6 md:h-8 bg-gradient-to-b from-[#6366f1] to-[#4f46e5] rounded-full" />
                  {getWeekDescription(0, weekOffset)} Forecast
                </h3>
                <WeatherChart
                  data={data[0]}
                  timeRange={selectedTimeRangeData}
                  chartKey={chartKey}
                  key={`chart-0-${chartKey}-${weekOffset}`}
                />
              </div>

              <div
                className={`lg:block ${mobileCardIndex === 1 ? "block" : "hidden"} card-glass rounded-2xl shadow-dark p-6 md:p-8 group hover:shadow-xl transition-all duration-300 ${weekOffset > 0 ? "animate-slide-left" : "animate-slide-right"}`}
              >
                <h3 className="text-lg md:text-xl font-display font-bold mb-6 flex items-center gap-3 text-white">
                  <span className="w-2 h-6 md:h-8 bg-gradient-to-b from-[#8b5cf6] to-[#ec4899] rounded-full" />
                  {getWeekDescription(1, weekOffset)} Forecast
                </h3>
                <WeatherChart
                  data={data[1]}
                  timeRange={selectedTimeRangeData}
                  chartKey={chartKey}
                  key={`chart-1-${chartKey}-${weekOffset}`}
                />
              </div>
            </div>
          </div>
        )}

        {!data && !isLoading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-2xl opacity-20 animate-pulse" />
              <CloudSun className="w-20 md:w-24 h-20 md:h-24 text-[#818cf8] mx-auto mb-6 relative animate-float" />
            </div>
            <p className="text-gray-300 text-lg md:text-xl mb-2">
              Ready to plan your event?
            </p>
            <p className="text-gray-500">
              Enter a location above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
