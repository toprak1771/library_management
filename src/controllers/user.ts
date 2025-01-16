import { Request, Response, NextFunction } from "express";
import { User, Book } from "@prisma/client";
import UserServices from "../services/user";
import BookServices from "../services/book";
import { HttpException } from "../exceptions/HttpException";
import { UpdateUser, UserBook } from "../types/user.type";
import { UpdateBook } from "../types/book.type";

class UserController {
  public _userService: UserServices;
  public _bookService: BookServices;
  constructor(userService: UserServices, bookService: BookServices) {
    this._userService = userService;
    this._bookService = bookService;
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
        body: { user_id, book_id },
      } = req;

      if (!user_id || !book_id) res.send("User id and book id is reqired.");

      const user: User | void = await this._userService.getUser(next, {
        id: user_id,
      });
      const book: Book | void = await this._bookService.getBook(next, {
        id: book_id,
      });

      if (user && book) {
        if (book.status === true) {
          res.status(400).json({
            status: false,
            message: "The book is not available for borrow.",
          });
          return;
        }

        book.status = true;
        book.user_id = user.id;
        if (typeof user.books === "object" && user.books !== null) {
          const _books = user.books as UserBook;
          _books.present.push({ name: book.name });
          user.books = _books;
        }
        const updateTypeUser: UpdateUser = {
          id: user.id,
          createdAt: user.createdAt,
          books: user.books,
          name: user.name,
          updatedAt: user.updatedAt,
        };

        const updateTypeBook: UpdateBook = {
          id: book.id,
          author: book.author,
          name: book.name,
          score: book.score,
          status: book.status,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
          year: book.year,
          user_id: book.user_id,
        };

        const updatedBook: Book | void = await this._bookService.updateBook(
          next,
          updateTypeBook
        );
        const uptatedUser: User | void = await this._userService.updateUser(
          next,
          updateTypeUser
        );

        res.status(200).json({
          message: "Succesfully borrow book.",
          user: uptatedUser,
          book: updatedBook,
        });
        return;
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };

  public return = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        body: { user_id, book_id, score },
      } = req;

      if (!user_id || !book_id) res.send("User id and book id is reqired.");

      const user: User | void = await this._userService.getUser(next, {
        id: user_id,
      });
      const book: Book | void = await this._bookService.getBook(next, {
        id: book_id,
      });

      if (user && book) {
        if (book.status === false) {
          res.status(400).json({
            status: false,
            message: "The book is not available for return.",
          });
          return;
        }

        book.status = false;
        book.user_id = null;
        book.score = Number(((Number(book.score) + score) / 2).toFixed(2));

        if (typeof user.books === "object" && user.books !== null) {
          const _books = user.books as UserBook;
          _books.past.push({ name: book.name, score: score });
          _books.present = _books.present.filter(
            (book) => book.name !== book.name
          );
          console.log("_books:", _books);
          user.books = _books;
        }

        const updateTypeUser: UpdateUser = {
          id: user.id,
          createdAt: user.createdAt,
          books: user.books,
          name: user.name,
          updatedAt: user.updatedAt,
        };

        const updateTypeBook: UpdateBook = {
          id: book.id,
          author: book.author,
          name: book.name,
          score: book.score,
          status: book.status,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
          year: book.year,
          user_id: book.user_id,
        };

        const updatedBook: Book | void = await this._bookService.updateBook(
          next,
          updateTypeBook
        );
        const uptatedUser: User | void = await this._userService.updateUser(
          next,
          updateTypeUser
        );

        res.status(200).json({
          message: "Succesfully return book.",
          user: uptatedUser,
          book: updatedBook,
        });
        return;
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
      console.log("error:", error);
      return;
    }
  };
}

export default UserController;
