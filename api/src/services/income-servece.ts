import Income, { IIncome } from "../models/Incomes";

class IncomeService {
  getIncomes = async (
    budgetId: string
  ): Promise<IIncome[] | null | undefined> => {
    try {
      const incomes = await Income.find({ budget_id: budgetId });
      return incomes;
    } catch (error: any) {
      throw error;
    }
  };

  createIncome = async (
    incomedata: IIncome
  ): Promise<IIncome[] | null | undefined> => {
    try {
      const newincome = new Income(incomedata);
      await newincome.save();
      const incomes = await this.getIncomes(incomedata.budget_id.toString());
      return incomes;
    } catch (error: any) {
      throw error;
    }
  };

  updateIncomes = async (
    incomedata: IIncome
  ): Promise<IIncome[] | null | undefined> => {
    try {
      await Income.findByIdAndUpdate(incomedata._id, incomedata);
      const incomes = await this.getIncomes(incomedata.budget_id.toString());
      return incomes;
    } catch (error: any) {
      throw error;
    }
  };
}

export default new IncomeService()
