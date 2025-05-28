export const getWeatherDescription = (data) => {
  const temp = data.tempmax;
  const humidity = data.humidity;
  const precipProb = data.precipprob;
  const windSpeed = data.windspeed;

  const descriptions = [];

  // Temperature assessment
  if (temp >= 60 && temp <= 75) {
    descriptions.push("Warm day");
  } else if (temp > 75 && temp <= 85) {
    descriptions.push("Hot day");
  } else if (temp > 85) {
    descriptions.push("Very hot day");
  } else if (temp >= 50 && temp < 60) {
    descriptions.push("Cool day");
  } else {
    descriptions.push("Cold day");
  }

  // Rain assessment
  if (precipProb > 75) {
    descriptions.push("High chance of rain");
  } else if (precipProb >= 25 && precipProb <= 75) {
    descriptions.push("Chance of rain");
  }

  // Wind assessment
  if (windSpeed > 20) {
    descriptions.push("Very windy");
  } else if (windSpeed > 10) {
    descriptions.push("Windy");
  }

  // Humidity assessment
  if (humidity > 75) {
    descriptions.push("Humid");
  }

  return descriptions;
};

export const getEventSuitability = (data) => {
  const temp = data.tempmax;
  const precipProb = data.precipprob;
  const windSpeed = data.windspeed;

  if (precipProb > 50 || windSpeed > 20 || temp < 45 || temp > 95) {
    return {
      suitable: false,
      reason:
        precipProb > 50
          ? "Too wet"
          : windSpeed > 20
            ? "Too windy"
            : temp < 45
              ? "Too cold"
              : "Too hot",
    };
  }

  if (temp >= 60 && temp <= 75 && precipProb < 25 && windSpeed < 10) {
    return {
      suitable: true,
      reason: "Perfect conditions",
    };
  }

  return {
    suitable: true,
    reason: "Acceptable conditions",
  };
};
