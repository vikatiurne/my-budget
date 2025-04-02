import { IDate } from "@/types/types";

export const currentMonthYear = () => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  const arrDate = isoDate.split("-");
  const currentMonth = +arrDate[1];

  const data: IDate = { year: arrDate[0], mounth: currentMonth.toString() };

  return data;
};
