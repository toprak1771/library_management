import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import UserController from "../controllers/user";
import UserServices from "../services/user";

export class UserRoute implements Routes {
    public path? = '/users';
    public router = Router();
    public _userController:UserController = new UserController(new UserServices());
    
    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`,this._userController.getAll);
    }
    
}