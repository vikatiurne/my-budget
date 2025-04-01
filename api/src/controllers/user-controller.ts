import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";

class UserController {
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser(email, password);
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.code === 11) {
        return res.status(400).json({
          message: "User with such email not found!",
        });
      }
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
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "User with such email already exist!",
        });
      }
      next(error);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {}
  };
}

export default new UserController();
