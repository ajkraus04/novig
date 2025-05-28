import axios from "axios";

const API_KEY = import.meta.env.VITE_VISUAL_CROSSING_API_KEY;
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export const fetchWeatherData = async ({ location, dates }) => {
  try {
    const promises = dates.map((date) => {
      const url = `${BASE_URL}/${encodeURIComponent(location)}/${date}?key=${API_KEY}&include=hours&unitGroup=us`;
      return axios.get(url);
    });

    const responses = await Promise.all(promises);
    return responses.map((response) => response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your Visual Crossing API key."
      );
    }
    throw new Error("Failed to fetch weather data. Please try again.");
  }
};
