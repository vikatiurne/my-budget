import { NextFunction, Request, Response } from "express";
import budgetService from "../services/budget-service";
import { IDate } from "../models/Budget";

class BudgetController {
  addBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { budgetdata } = req.body;
      const budget = await budgetService.addBudget(budgetdata);
      return res.status(201).json(budget);
    } catch (error) {
      next(error);
    }
  };

  getAllBudgets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const budgets = await budgetService.getAllBudgets(userId);
      return res.status(200).json(budgets);
    } catch (error) {
      next(error);
    }
  };

  getBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { mounth, year } = req.query;

      if (mounth && year) {
        const budget = await budgetService.getBudget(userId, {
          mounth: mounth,
          year: year,
        } as IDate);
        if (!budget?.length) {
          return res
            .status(400)
            .json({ message: "Budget for this month didn't set!" });
        } else {
          return res.status(200).json(budget);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getBudgetById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId, budgetId } = req.params;
      const budgets = await budgetService.getBudgetById(userId, budgetId);
      return res.status(200).json(budgets);
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
      const budget = await budgetService.getMinMaxAvarageBudget(
        userId,
        from,
        till
      );
      return res.status(200).json(budget);
    } catch (error) {
      next(error);
    }
  };
  updateBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { date, income, budget } = req.body;
      const updatedbudget = await budgetService.updateBudget(
        userId,
        date,
        income,
        budget
      );
      return res.status(200).json(updatedbudget);
    } catch (error) {
      next(error);
    }
  };
}

export default new BudgetController();
