import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import { BookRoute } from "./routers/book";
import { UserRoute } from "./routers/user";
import { Routes } from "./interfaces/routes.interface";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/',(req,res) => {
    res.send("Hello world");
})

initalizeRoutes([new BookRoute(),new UserRoute()]);

function initalizeRoutes(routes: Routes[]) {
  routes.forEach((route) => {
    app.use("/", route.router);
  });
}

app.use(ErrorMiddleware);

app.listen(port,() => {
    console.log(`Library management app listening on port ${port}`)
})