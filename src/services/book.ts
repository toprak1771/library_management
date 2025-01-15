import { PrismaClient, Book } from "@prisma/client";
import { NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { GetBook } from "../types/book.type";

class BookServices {
  public book = new PrismaClient().book;

  public async getAll(next: NextFunction): Promise<Book[] | void> {
    try {
      const books: Book[] = await this.book.findMany();
      return books;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }

  public async getBook(
    next: NextFunction,
    data: GetBook
  ): Promise<Book | void | null> {
    try {
      const book: Book | null = await this.book.findUnique({
        where: { id: data.id },
      });
      return book;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }
}

export default BookServices;
