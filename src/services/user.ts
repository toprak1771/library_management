import { PrismaClient, User } from "@prisma/client";
import { NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { GetUser } from "../types/user.type";

class UserServices {
  public user = new PrismaClient().user;

  public async getAll(next: NextFunction): Promise<User[] | void> {
    try {
      const users: User[] = await this.user.findMany({
        include:{
            book:true
        }
      });
      return users;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }

  public async getUser(
    next: NextFunction,
    data: GetUser
  ): Promise<User | void | null> {
    try {
      const user: User | null = await this.user.findUnique({
        where: { id: data.id },
      });
      return user;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }
}

export default UserServices;
