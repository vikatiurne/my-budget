import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";

class UserController {
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email } = req.body;
      const user = await userService.loginUser(email);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { data } = req.body;
      const user = await userService.registrationUser(data);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
