import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../services/weatherApi";

export const useWeatherData = (location, dates) => {
  return useQuery({
    queryKey: ["weather", location, dates],
    queryFn: () => fetchWeatherData({ location, dates }),
    enabled: !!location && dates.length > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
};
