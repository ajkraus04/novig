import { useEffect } from "react";
import { useWeatherData } from "./useWeatherData";
import { useWeatherStore } from "../stores/weatherStore";

export const useWeatherControl = () => {
  const {
    location,
    dates,
    setLocationError,
    resetToCurrentWeek,
    setMobileCardIndex,
    forceChartRefresh,
  } = useWeatherStore();

  const { data, isLoading, error, refetch } = useWeatherData(location, dates);

  // Force chart refresh when data changes
  useEffect(() => {
    if (data) {
      forceChartRefresh();
    }
  }, [data, forceChartRefresh]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setLocationError("Please enter a location");
      return;
    }
    setLocationError("");
    resetToCurrentWeek(); // Reset to current week
    setMobileCardIndex(0); // Reset mobile view
    forceChartRefresh(); // Force chart refresh
    refetch();
  };

  return {
    data,
    isLoading,
    error,
    handleLocationSubmit,
  };
};
