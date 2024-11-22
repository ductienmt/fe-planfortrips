import { format } from "date-fns";

export const DateFormatter = (date) => {
  return format(date, "dd-MM-yyyy HH:mm:ss");
};

export const formatDateTimeUtils = (input) => {
  if (!input) {
    console.error("Input is null or undefined in formatDateTimeUtils");
    return "";
  }
  const [datePart, timePart] = input.split("T");
  const [day, month, year] = datePart.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${timePart}:00`;
  return `${formattedDate}T${formattedTime}`;
};
