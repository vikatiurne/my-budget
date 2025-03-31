import Expense, { IExpense } from "../models/Expenses";
import { ExpenseStats, minMaxAvarage } from "../utils/minMaxAvarage";

class ExpenseService {
  getExpenses = async (
    userId: string,
    budgetId: string
  ): Promise<IExpense | null | undefined> => {
    try {
      const expenses = await Expense.find({
        user_id: userId,
        budget_id: budgetId,
      });
      return expenses[0];
    } catch (error: any) {
      throw new Error(`Error getting expenses: ${error.message}`);
    }
  };

  getMinMaxAvarageExpenseForDay = async (
    userId: string,
    day: string 
  ): Promise<ExpenseStats | null | undefined> => {
    try {
      let currentDate: string;
      if (!day) {
        const date = new Date();
        const currentIsoDate = date.toISOString();
        currentDate = currentIsoDate.replace("Z", "+00.00");
      } else {
        currentDate = day;
      }

      const expensesForDay = await Expense.find({
        user_id: userId,
        createdAt: currentDate,
      });

      return minMaxAvarage(expensesForDay);
    } catch (error: any) {
      throw new Error(`Error getting expense stats for day: ${error.message}`);
    }
  };

  getMinMaxAvarageExpenseForPeriod = async (
    userId: string,
    from: string,
    till: string
  ): Promise<ExpenseStats | null | undefined> => {
    try {
      const expensesFromPeriod = await Expense.find({
        user_id: userId,
        $gte: new Date(from),
        $lt: new Date(till),
      });

      return minMaxAvarage(expensesFromPeriod);
    } catch (error: any) {
      throw new Error(
        `Error getting expense stats for period : ${error.message}`
      );
    }
  };

  createExpense = async (
    data: IExpense
  ): Promise<IExpense | null | undefined> => {
    try {
      const newexpense = new Expense(data);
      await newexpense.save();
      return newexpense;
    } catch (error: any) {
      throw new Error(`Error creating expense: ${error.message}`);
    }
  };

  updateExpense = async (
    id: string,
    data: IExpense
  ): Promise<IExpense | null | undefined> => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(id, {
        title: data.title,
        price: data.price,
      });
      return updatedExpense;
    } catch (error: any) {
      throw new Error(`Error updating expense: ${error.message}`);
    }
  };

  deleteExpense = async (id: string): Promise<IExpense | null | undefined> => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      return deletedExpense;
    } catch (error: any) {
      throw new Error(`Error updating expense: ${error.message}`);
    }
  };
}

export default new ExpenseService();
