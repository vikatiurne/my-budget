import Budget, { IBudget, IDate } from "../models/Budget";
import { ExpenseStats, minMaxAvarage } from "../utils/minMaxAvarage";

class BudgetService {
  addBudget = async (
    budgetdata: IBudget
  ): Promise<IBudget | null | undefined> => {
    try {
      const newbudget = new Budget(budgetdata);
      await newbudget.save();
      const currentBudget = await Budget.findById(newbudget._id);
      return currentBudget;
    } catch (error: any) {
      throw new Error(`Error creating budget: ${error.message}`);
    }
  };

  getBudget = async (
    userId: string,
    date: IDate
  ): Promise<IBudget | null | undefined> => {
    try {
      const budget = await Budget.find({
        user_id: userId,
        date: date,
      });
      return budget[0];
    } catch (error: any) {
      throw new Error(`Error getting budget: ${error.message}`);
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
      throw new Error(`Error getting budget stats: ${error.message}`);
    }
  };

  updateBudget = async (
    userId: string,
    date: IDate,
    income: number
  ): Promise<IBudget | null | undefined> => {
    try {
      const prevBudget = await this.getBudget(userId, date);
      if (!!prevBudget) {
        const updatedbudget = prevBudget.budget + income;
        await Budget.updateOne({ budget: updatedbudget });
      }
      return await this.getBudget(userId, date);
    } catch (error: any) {
      throw new Error(`Error updating budget: ${error.message}`);
    }
  };
}

export default new BudgetService();
