import { IBudget } from "../models/Budget";
import { IExpense } from "../models/Expenses";

interface Stats {
  total: number;
  count: number;
  min: number;
  max: number;
}
export interface ExpenseStats {
  minExpense: number;
  maxExpense: number;
  avarsgeExpense: number;
}

type Data = IExpense[] | IBudget[];

export const minMaxAvarage = (data: Data): ExpenseStats => {
  const expensesStats: Record<string, Stats> = data.reduce((acc, item) => {
    const date = item.createdAt;

    let price: number = 0;
    price = "price" in item ? item.price : item.budget;

    if (!acc[date]) {
      acc[date] = { total: 0, count: 0, min: price, max: price };
    }
    if (price > acc[date].max) {
      acc[date].max = price;
    }
    if (price < acc[date].min) {
      acc[date].min = price;
    }
    acc[date].total += price;
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, Stats>);

  const updatedData = data.map((item) => {
    const stats = expensesStats[item.createdAt];
    return {
      minExpense: stats.min,
      maxExpense: stats.max,
      avarsgeExpense: stats.total / stats.count,
    };
  });

  return updatedData[0];
};
