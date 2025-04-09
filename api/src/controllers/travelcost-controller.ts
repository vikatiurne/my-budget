import { NextFunction, Request, Response } from "express";
import travelcostServise from "../services/travelcost-servise";

class TravelCostController {
  getCalculationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const calculatoin = await travelcostServise.getCalculationById(id);
      res.status(200).json(calculatoin);
    } catch (error) {
      next(error);
    }
  };

  getListCalculation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const list = await travelcostServise.getListCalculation();
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  createTravelCost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { data } = req.body;
      const list = travelcostServise.createTravelCost(data);
      res.status(201).json(list);
    } catch (error) {
      next(error);
    }
  };

  updateTravelCost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const list = await travelcostServise.updateTravelCost(id, data);
      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  deleteCalculationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const list = travelcostServise.deleteCalculationById(id);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };
}

export default new TravelCostController()
