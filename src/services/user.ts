import { PrismaClient, User } from "@prisma/client";
import { NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { GetUser,UpdateUser } from "../types/user.type";

class UserServices {
  public user = new PrismaClient().user;

  public async getAll(next: NextFunction): Promise<User[] | void> {
    try {
      const users: User[] = await this.user.findMany({
        include:{
            present_books:true
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
  ): Promise<User | void> {
    try {
      const user: User | null = await this.user.findUnique({
        where: { id: data.id },
      });
      if (user) return user;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }

    public async updateUser(next:NextFunction,data:UpdateUser):Promise<User | void> {
      try {
        const updatedUser:User = await this.user.update({
          where:{id:data.id},
          data:data
        })
        return updatedUser;
      } catch (error:any) {
        next(new HttpException(400, error.message));
        console.log("error:", error);
        return;
      }
    }
}

export default UserServices;
