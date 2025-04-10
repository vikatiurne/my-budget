import mongoose from "mongoose";
import Budget, { IBudget, IDate, IIncome } from "../models/Budget";
import { ExpenseStats, minMaxAvarage } from "../utils/minMaxAvarage";

const { ObjectId } = mongoose.Types;

class BudgetService {
  addBudget = async (
    budgetdata: IBudget
  ): Promise<IBudget[] | null | undefined> => {
    try {
      const newbudget = new Budget(budgetdata);
      await newbudget.save();
      const allBudgets = await Budget.find();
      const currentBudget = allBudgets.filter((b) => {
        const isUserIdMatch = new ObjectId(budgetdata.user_id).equals(
          b.user_id
        );
        const isMonthMatch = b.date.mounth === budgetdata.date.mounth;
        const isYearMatch = b.date.year === budgetdata.date.year;

        return isUserIdMatch && isMonthMatch && isYearMatch;
      });
      return currentBudget;
    } catch (error: any) {
      throw error;
    }
  };

  getBudget = async (
    userId: string,
    date: IDate
  ): Promise<IBudget[] | null | undefined> => {
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

  updateBudget = async (
    userId: string,
    date: IDate,
    income: IIncome[],
    budget: number
  ): Promise<IBudget[] | null | undefined> => {
    try {
      const prevBudget = await this.getBudget(userId, date);
      if (prevBudget?.length) {
        const checkIncome = prevBudget[0].income.map(
          (item) => item.incomename === "" && item.sum === 0
        );
        if (!checkIncome[0]) {
          await Budget.updateOne(
            {
              user_id: userId,
              "date.mounth": date.mounth,
              "date.year": date.year,
            },
            { $push: { income: income }, $set: { budget: budget + income[0].sum } }
          );
        } else {
          await Budget.updateOne(
            {
              user_id: userId,
              "date.mounth": date.mounth,
              "date.year": date.year,
            },
            { income: income, budget: budget + income[0].sum }
          );
        }
      }
      const updatedBudget = await this.getBudget(userId, date);
      return updatedBudget;
    } catch (error: any) {
      throw error;
    }
  };
}

export default new BudgetService();
