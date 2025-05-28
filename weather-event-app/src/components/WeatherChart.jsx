import { Line } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const WeatherChart = ({ data, timeRange, chartKey }) => {
  const chartRef = useRef(null);

  if (!data || !data.days || !data.days[0] || !data.days[0].hours) {
    return (
      <div className="h-72 w-full relative flex items-center justify-center">
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }

  const dayData = data.days[0];

  const hours = timeRange
    ? dayData.hours.filter((hour) => {
        const hourNum = parseInt(hour.datetime.split(":")[0]);
        return hourNum >= timeRange.start && hourNum < timeRange.end;
      })
    : dayData.hours;

  if (!hours || hours.length === 0) {
    return (
      <div className="h-72 w-full relative flex items-center justify-center">
        <p className="text-gray-500">No data for selected time range</p>
      </div>
    );
  }

  const chartData = {
    labels: hours.map((h) => {
      const hour = parseInt(h.datetime.split(":")[0]);
      return hour === 0
        ? "12 AM"
        : hour < 12
          ? `${hour} AM`
          : hour === 12
            ? "12 PM"
            : `${hour - 12} PM`;
    }),
    datasets: [
      {
        label: "Temperature (°F)",
        data: hours.map((h) => h.temp),
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(249, 115, 22, 0.3)");
          gradient.addColorStop(1, "rgba(249, 115, 22, 0.0)");
          return gradient;
        },
        yAxisID: "y",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(249, 115, 22)",
        pointBorderColor: "rgba(17, 24, 39, 0.8)",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: "Rain Chance (%)",
        data: hours.map((h) => h.precipprob),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
          return gradient;
        },
        yAxisID: "y1",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "rgba(17, 24, 39, 0.8)",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
            weight: "500",
          },
          color: "#e5e7eb",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#f3f4f6",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(75, 85, 99, 0.3)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          afterLabel: (context) => {
            const index = context.dataIndex;
            const hour = hours[index];
            return [
              `Wind: ${Math.round(hour.windspeed)} mph`,
              `Humidity: ${Math.round(hour.humidity)}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#9ca3af",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Temperature (°F)",
          color: "#9ca3af",
          font: {
            size: 13,
            weight: "500",
          },
        },
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        max: 100,
        title: {
          display: true,
          text: "Rain Chance (%)",
          color: "#9ca3af",
          font: {
            size: 13,
            weight: "500",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
        },
      },
    },
  };

  return (
    <div className="h-72 w-full relative">
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        key={`chart-${chartKey}-${timeRange?.value || "all"}`}
      />
    </div>
  );
};
