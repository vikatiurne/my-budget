import { NextFunction, Request, Response } from "express";
import incomeServece from "../services/income-servece";

class IncomeController {
  getIncomes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { budgetId } = req.params;
      const incomes = await incomeServece.getIncomes(budgetId);
      res.status(200).json(incomes);
    } catch (error) {
      next(error);
    }
  };
  createIncome = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { incomedata } = req.body;
      const incomes = await incomeServece.createIncome(incomedata);
      res.status(201).json(incomes);
    } catch (error) {
      next(error);
    }
  };
  updateIncomes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { incomedata } = req.body;
      const incomes = await incomeServece.updateIncomes(incomedata);
      res.status(200).json(incomes);
    } catch (error) {
      next(error);
    }
  };
}

export default new IncomeController();
