import { Request, Response, NextFunction } from "express";
import { Book } from "@prisma/client";
import BookServices from "../services/book";
import { HttpException } from "../exceptions/HttpException";

class BookController {
  public _bookService: BookServices;
  constructor(bookService: BookServices) {
    this._bookService = bookService;
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.query.id;

    if (id) {
      await this.getBook(req, res, next);
      return;
    }
    try {
      const books: Book[] | void = await this._bookService.getAll(next);
      res.status(200).json({
        books,
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };

  public getBook = async (
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

      const book: Book | void | null = await this._bookService.getBook(next, {
        id: Number(id),
      });
      res.status(200).json({
        book,
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };
}

export default BookController;
