import { format, addDays, nextFriday, isFriday, startOfDay } from "date-fns";

export const getNextTwoFridays = () => {
  const today = startOfDay(new Date());
  const firstFriday = isFriday(today) ? today : nextFriday(today);
  const secondFriday = addDays(firstFriday, 7);

  return [
    format(firstFriday, "yyyy-MM-dd"),
    format(secondFriday, "yyyy-MM-dd"),
  ];
};

export const getDayOptions = () => [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export const getTimeRangeOptions = () => [
  { value: "morning", label: "Morning (9AM - 12PM)", start: 9, end: 12 },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)", start: 12, end: 17 },
  { value: "evening", label: "Evening (5PM - 8PM)", start: 17, end: 20 },
];

export const getNextTwoDatesForDay = (dayName, baseDate = new Date()) => {
  const dayMap = {
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
    sunday: 1,
  };

  const targetDay = dayMap[dayName.toLowerCase()];
  const currentDay = baseDate.getDay();

  let daysUntilNext = targetDay - currentDay;
  if (daysUntilNext <= 0) daysUntilNext += 7;

  const firstDate = addDays(baseDate, daysUntilNext);
  const secondDate = addDays(firstDate, 7);

  return [format(firstDate, "yyyy-MM-dd"), format(secondDate, "yyyy-MM-dd")];
};
