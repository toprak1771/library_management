import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import BookController from "../controllers/book";
import BookServices from "../services/book";

export class BookRoute implements Routes {
    public path? = '/books';
    public router = Router();
    public _bookController:BookController = new BookController(new BookServices());
    
    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`,this._bookController.getAll);
    }
    
}