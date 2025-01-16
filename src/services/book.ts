import { PrismaClient, Book } from "@prisma/client";
import { NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import { GetBook, UpdateBook } from "../types/book.type";
import { promisify } from "util";
import redis from "./redis";

class BookServices {
  public book = new PrismaClient().book;
  
  public redisKeys = redis ? promisify(redis.keys).bind(redis) : null;
  public redisGet = redis ? promisify(redis.get).bind(redis) : null;
  public redisSet = redis ? promisify(redis.set).bind(redis) : null;

  public async getAll(next: NextFunction): Promise<Book[] | void> {
    try {
      let books: Book[];

      if (this.redisKeys && this.redisGet) {
        const keys: any = await this.redisKeys("Book*");

        if (keys?.length > 0) {
          const bookList: Book[] = await Promise.all(
            keys.map(async (redisKey: any) => {
              if (this.redisGet) {
                const book: any = await this.redisGet(redisKey);
                return JSON.parse(book);
              }
              return null;
            })
          );
          return bookList.filter((book) => book !== null); // Geçerli olmayan değerleri filtrele
        }
      }

      books = await this.book.findMany({
        include: {
          user: true,
        },
      });

      if (this.redisSet) {
        for (const book of books) {
          const bookName = "Book" + book.id;
          const dataRedis = JSON.stringify(book);
          const redisGet = await this.redisSet(bookName, dataRedis);
        }
      }
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
  ): Promise<Book | void> {
    try {
      const bookName = "Book" + data.id;
      if (this.redisGet) {
        const bookRedis: any = await this.redisGet(bookName);
        if (bookRedis) {
          return JSON.parse(bookRedis);
        }
      }

      const book: Book | null = await this.book.findUnique({
        where: { id: data.id },
        include: { user: true },
      });
      if (book) return book;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }

  public async updateBook(
    next: NextFunction,
    data: UpdateBook
  ): Promise<Book | void> {
    try {
      const updatedBook: Book = await this.book.update({
        where: { id: data.id },
        data: data,
      });

      if (this.redisSet) {
        const bookName = "Book" + updatedBook.id;
        const dataRedis = JSON.stringify(updatedBook);
        const redisGet = await this.redisSet(bookName, dataRedis);
      }

      return updatedBook;
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  }
}

export default BookServices;
