import { format } from "date-fns";

export const DateFormatter = (date) => {
  return format(date, "dd-MM-yyyy HH:mm:ss");
};
