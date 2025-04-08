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

      const pageQuery = req.query.page;
      const limitQuery = req.query.limit;
      const from = req.query.from;
      const till = req.query.till;

      const page = pageQuery === "string" ? parseInt(pageQuery) : 1;
      const limit = limitQuery === "string" ? parseInt(limitQuery) : 200;

      if (typeof from !== "string" || typeof till !== "string")
        return res.status(400).json({ message: "Invalid date parametr" });

      const expense = await expenseServise.getExpenses(
        userId,
        budgetId,
        page,
        limit,
        from,
        till
      );
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
      const expenses = await expenseServise.createExpense(data);
      res.status(201).json(expenses);
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
      const { id, budgetId } = req.params;
      const { data } = req.body;
      const expense = await expenseServise.updateExpense(id, budgetId, data);
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
      const { sum } = req.body;
      const expense = await expenseServise.deleteExpense(id, sum);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };
}

export default new ExpenseController();
