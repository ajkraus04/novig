import { format } from "date-fns";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  ThermometerSun,
  AlertCircle,
} from "lucide-react";
import {
  getWeatherDescription,
  getEventSuitability,
} from "../utils/weatherHelpers";
import { cn } from "../utils/cn";

export const WeatherCard = ({
  data,
  timeRange,
  isCurrentWeek,
  weekDescription,
}) => {
  if (!data) return null;

  const descriptions = getWeatherDescription(data.days[0]);
  const suitability = getEventSuitability(data.days[0]);
  const dayData = data.days[0];

  const getWeatherIcon = () => {
    if (dayData.precipprob > 50) return <CloudRain className="w-16 h-16" />;
    if (dayData.cloudcover > 50) return <Cloud className="w-16 h-16" />;
    return <Sun className="w-16 h-16" />;
  };

  const getTimeRangeData = () => {
    if (!timeRange || !dayData.hours) return dayData;

    const hours = dayData.hours.filter((hour) => {
      const hourNum = parseInt(hour.datetime.split(":")[0]);
      return hourNum >= timeRange.start && hourNum < timeRange.end;
    });

    if (hours.length === 0) return dayData;

    return {
      tempmax: Math.max(...hours.map((h) => h.temp)),
      tempmin: Math.min(...hours.map((h) => h.temp)),
      precipprob:
        hours.reduce((sum, h) => sum + h.precipprob, 0) / hours.length,
      windspeed: hours.reduce((sum, h) => sum + h.windspeed, 0) / hours.length,
      humidity: hours.reduce((sum, h) => sum + h.humidity, 0) / hours.length,
    };
  };

  const rangeData = getTimeRangeData();

  return (
    <div
      className={cn(
        "relative card-glass rounded-2xl shadow-dark p-8 space-y-6 transition-all duration-300 hover:shadow-xl group animate-scale-in",
        suitability.suitable
          ? "hover:shadow-green-500/20"
          : "hover:shadow-red-500/20",
        isCurrentWeek &&
          "ring-2 ring-[#6366f1]/30 ring-offset-4 ring-offset-gray-900/20"
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          suitability.suitable
            ? "bg-gradient-to-br from-green-900/20 to-transparent"
            : "bg-gradient-to-br from-red-900/20 to-transparent"
        )}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-display font-bold text-white">
                {weekDescription || (isCurrentWeek ? "This Week" : "Next Week")}
              </h3>
              {(weekDescription === "This Week" ||
                weekDescription === "Current Week") && (
                <span className="px-3 py-1 bg-[#6366f1]/20 text-[#a5b4fc] text-xs font-semibold rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-gray-400 font-medium">
              {format(new Date(data.days[0].datetime), "EEEE, MMMM d")}
            </p>
          </div>
          <div
            className={cn(
              "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
              suitability.suitable
                ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20"
                : "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20"
            )}
          >
            {getWeatherIcon()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-800/20 rounded-xl p-4 group-hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <ThermometerSun className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Temperature</p>
                <p className="font-semibold text-white">
                  {Math.round(rangeData.tempmin)}° -{" "}
                  {Math.round(rangeData.tempmax)}°F
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/20 rounded-xl p-4 group-hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CloudRain className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Rain Chance</p>
                <p className="font-semibold text-white">
                  {Math.round(rangeData.precipprob)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/10 border border-gray-700/20 rounded-xl p-4 group-hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-600/20 rounded-lg">
                <Wind className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Wind Speed</p>
                <p className="font-semibold text-white">
                  {Math.round(rangeData.windspeed)} mph
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-800/20 rounded-xl p-4 group-hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Humidity</p>
                <p className="font-semibold text-white">
                  {Math.round(rangeData.humidity)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {descriptions.map((desc, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 text-[#a5b4fc] border border-[#6366f1]/30 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                {desc}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "flex items-center gap-3 p-5 rounded-xl transition-all duration-300 border",
              suitability.suitable
                ? "bg-green-900/20 border-green-700/30 hover:shadow-green-500/10 hover:shadow-lg"
                : "bg-red-900/20 border-red-700/30 hover:shadow-red-500/10 hover:shadow-lg"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                suitability.suitable ? "bg-green-500/20" : "bg-red-500/20"
              )}
            >
              <AlertCircle
                className={cn(
                  "w-6 h-6",
                  suitability.suitable ? "text-green-400" : "text-red-400"
                )}
              />
            </div>
            <span
              className={cn(
                "font-semibold text-lg",
                suitability.suitable ? "text-green-300" : "text-red-300"
              )}
            >
              {suitability.reason}
            </span>
          </div>
        </div>

        {dayData.description && (
          <p className="text-sm text-gray-400 italic bg-gray-900/50 border border-gray-800/30 rounded-lg p-4 mt-4">
            {dayData.description}
          </p>
        )}
      </div>
    </div>
  );
};
