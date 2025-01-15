import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import UserServices from "../services/user";
import { HttpException } from "../exceptions/HttpException";

class UserController {
  public _userService: UserServices;
  constructor(userService: UserServices) {
    this._userService = userService;
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.query.id;

    if (id) {
      await this.getUser(req, res, next);
      return;
    }
    try {
      const users: User[] | void = await this._userService.getAll(next);
      res.status(200).json({
        users,
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };

  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        query: { id },
      } = req;

      if (!id) {
        res.status(400).json({
          message: "İd is required parameter.",
        });
        return;
      }

      const user: User | void | null = await this._userService.getUser(next, {
        id: Number(id),
      });
      res.status(200).json({
        user,
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };

  public borrow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        body: { user_id,book_id},
      } = req;

      
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };
}

export default UserController;
