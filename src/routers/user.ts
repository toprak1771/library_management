import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import UserController from "../controllers/user";
import UserServices from "../services/user";
import BookServices from "../services/book";

export class UserRoute implements Routes {
    public path? = '/users';
    public router = Router();
    public _userController:UserController = new UserController(new UserServices(),new BookServices());
    
    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`,this._userController.getAll);
        this.router.post(`${this.path}/borrow`,this._userController.borrow);
        this.router.post(`${this.path}/return`,this._userController.return);
    }
    
}