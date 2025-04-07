import { format } from "date-fns";
import { currentMonthYear } from "./currentMonthYear";

interface DatePeriod {
  start: string;
  end: Date;
}

export const defaultDatePeriod = (): DatePeriod => {
  const currentdate = currentMonthYear();
  const startDate = currentdate
    ? new Date(Date.UTC(+currentdate.year, +currentdate.mounth - 1, 1))
    : new Date();

  const end = new Date();
  
  startDate.setHours(0, 0, 0, 0);

  const start = format(startDate, "yyyy-MM-dd");

  end.setHours(23, 59, 59, 999);

  return { start, end };
};
