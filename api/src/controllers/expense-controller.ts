import { NextFunction, Request, Response } from "express";
import expenseServise from "../services/expense-servise";

class ExpenseController {
  getExpenses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId, budgetId } = req.params;
      const expense = await expenseServise.getExpenses(userId, budgetId);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };

  getStatsForDay = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { day } = req.query;
      if (typeof day !== "string")
        return res.status(400).json({ message: "Invalid day parametr" });
      const stats = await expenseServise.getMinMaxAvarageExpenseForDay(
        userId,
        day
      );
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };
  getStatsForPeriod = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { from, till } = req.query;
      if (typeof from !== "string" || typeof till !== "string")
        return res.status(400).json({ message: "Invalid date parametr" });
      const stats = await expenseServise.getMinMaxAvarageExpenseForPeriod(
        userId,
        from,
        till
      );
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };

  createExpense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { data } = req.body;
      const expense = await expenseServise.createExpense(data);
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  };
  updateExpense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const expense = await expenseServise.updateExpense(id, data);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };
  deleteExpense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const expense = await expenseServise.deleteExpense(id);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };
}

export default new ExpenseController();
