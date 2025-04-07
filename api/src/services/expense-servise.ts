import Budget from "../models/Budget";
import Expense, { IExpense } from "../models/Expenses";
import { ExpenseStats, minMaxAvarage } from "../utils/minMaxAvarage";

class ExpenseService {
  getExpenses = async (
    userId: string,
    budgetId: string,
    page: number,
    limit: number,
    from: string,
    till: string
  ): Promise<IExpense[] | null | undefined> => {
    try {
      const skip = page - 1;
      const expenses = await Expense.find({
        user_id: userId,
        budget_id: budgetId,
        createdAt: {
          $gte: new Date(from),
          $lt: new Date(till),
        },
      })
        .sort({ createAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      return expenses;
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
  ): Promise<IExpense[] | null | undefined> => {
    try {
      await Budget.findByIdAndUpdate(data.budget_id, {
        $inc: { budget: -data.price },
      });
      const newexpense = new Expense(data);
      await newexpense.save();
      const newexpenses = await Expense.find({ budget_id: data.budget_id });
      return newexpenses;
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

  deleteExpense = async (
    id: string,
    sum: number
  ): Promise<IExpense | null | undefined> => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      await Budget.findByIdAndUpdate(deletedExpense?.budget_id, {
        $inc: { budget: sum },
      });
      return deletedExpense;
    } catch (error: any) {
      throw new Error(`Error updating expense: ${error.message}`);
    }
  };
}

export default new ExpenseService();
