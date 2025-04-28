import mongoose from "mongoose";
import Budget, { IBudget, IDate } from "../models/Budget";
import { ExpenseStats, minMaxAvarage } from "../utils/minMaxAvarage";

const { ObjectId } = mongoose.Types;

class BudgetService {
  addBudget = async (
    budgetdata: IBudget
  ): Promise<IBudget[] | null | undefined> => {
    try {
      const newbudget = new Budget(budgetdata);
      await newbudget.save();
      const allbudgets = this.getAllBudgets(budgetdata.user_id.toString());
      return allbudgets;
    } catch (error: any) {
      throw error;
    }
  };

  getBudget = async (
    userId: string,
    date: IDate
  ): Promise<IBudget[] | null | undefined> => {
    console.log(date);
    console.log(userId);
    try {
      const budget = await Budget.find({
        user_id: userId,
        "date.mounth": date.mounth,
        "date.year": date.year,
      });
      return budget;
    } catch (error: any) {
      throw error;
    }
  };

  getAllBudgets = async (
    userId: string
  ): Promise<IBudget[] | null | undefined> => {
    try {
      const budgets = await Budget.find({ user_id: userId });
      return budgets;
    } catch (error: any) {
      throw error;
    }
  };

  getMinMaxAvarageBudget = async (
    userId: string,
    from: string,
    till: string
  ): Promise<ExpenseStats | null | undefined> => {
    try {
      const budgetForPeriod = await Budget.find({
        user_id: userId,
        $gte: new Date(from),
        $lt: new Date(till),
      });

      return minMaxAvarage(budgetForPeriod);
    } catch (error: any) {
      throw error;
    }
  };

  getBudgetById = async (
    budgetId: string
  ): Promise<IBudget | null | undefined> => {
    try {
      const budget = await Budget.findById(budgetId);
      return budget;
    } catch (error: any) {
      throw error;
    }
  };

  updateBudget = async (
    budgetId: string,
    income: number
  ): Promise<IBudget | null | undefined> => {
    try {
      const updatedBudget = await Budget.findByIdAndUpdate(
        budgetId,
        { $inc: { budget: income } },
        { new: true }
      );
      return updatedBudget;
    } catch (error: any) {
      throw error;
    }
  };

  deleteBudget = async (
    budgetId: string
  ): Promise<IBudget | null | undefined> => {
    try {
      const deleted = await Budget.findByIdAndDelete(budgetId, { new: true });
      return deleted;
    } catch (error: any) {
      throw error;
    }
  };
}

export default new BudgetService();
