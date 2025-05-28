import { create } from "zustand";
import { addWeeks } from "date-fns";
import {
  getNextTwoDatesForDay,
  getTimeRangeOptions,
} from "../utils/dateHelpers";

export const useWeatherStore = create((set, get) => ({
  location: "",
  selectedDay: "friday",
  selectedTimeRange: "afternoon",
  dates: [],
  locationError: "",
  weekOffset: 0,
  mobileCardIndex: 0,
  chartKey: 0,

  timeRangeOptions: getTimeRangeOptions(),

  setLocation: (location) => set({ location }),

  setSelectedDay: (day) => {
    const { weekOffset } = get();
    const baseDate = addWeeks(new Date(), weekOffset);
    const newDates = getNextTwoDatesForDay(day, baseDate);
    set((state) => ({
      selectedDay: day,
      dates: newDates,
      chartKey: state.chartKey + 1,
    }));
  },

  setSelectedTimeRange: (timeRange) =>
    set((state) => ({
      selectedTimeRange: timeRange,
      chartKey: state.chartKey + 1,
    })),

  setLocationError: (error) => set({ locationError: error }),

  setWeekOffset: (offset) => {
    const { selectedDay } = get();
    const baseDate = addWeeks(new Date(), offset);
    const newDates = getNextTwoDatesForDay(selectedDay, baseDate);
    set((state) => ({
      weekOffset: offset,
      dates: newDates,
      mobileCardIndex: 0,
      chartKey: state.chartKey + 1,
    }));
  },

  navigateWeek: (direction) => {
    const { weekOffset } = get();
    const newOffset = weekOffset + direction;
    get().setWeekOffset(newOffset);
  },

  setMobileCardIndex: (index) => set({ mobileCardIndex: index }),

  resetToCurrentWeek: () => {
    get().setWeekOffset(0);
  },

  forceChartRefresh: () => set((state) => ({ chartKey: state.chartKey + 1 })),

  initializeDates: () => {
    const { selectedDay, weekOffset } = get();
    const baseDate = addWeeks(new Date(), weekOffset);
    const newDates = getNextTwoDatesForDay(selectedDay, baseDate);
    set({ dates: newDates });
  },

  getSelectedTimeRangeData: () => {
    const { selectedTimeRange, timeRangeOptions } = get();
    return timeRangeOptions.find((opt) => opt.value === selectedTimeRange);
  },

  // Week label helpers
  getWeekLabel: (offset) => {
    if (offset === 0) return "Current Week";
    if (offset === 1) return "Next Week";
    if (offset === -1) return "Last Week";
    if (offset > 1) return `${offset} weeks ahead`;
    return `${Math.abs(offset)} weeks ago`;
  },

  getWeekDescription: (weekIndex, offset) => {
    if (offset === 0) {
      return weekIndex === 0 ? "This Week" : "Next Week";
    }
    if (offset === 1) {
      return weekIndex === 0 ? "Next Week" : "Week After";
    }
    if (offset === -1) {
      return weekIndex === 0 ? "Last Week" : "Current Week";
    }
    if (offset > 1) {
      return weekIndex === 0
        ? `${offset} weeks ahead`
        : `${offset + 1} weeks ahead`;
    }
    return weekIndex === 0
      ? `${Math.abs(offset)} weeks ago`
      : `${Math.abs(offset - 1)} weeks ago`;
  },
}));
