import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import os from "os";
import { StatusCodes } from "http-status-codes";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req:Request, res:Response, next:NextFunction) =>{
res.send('hey!')
})

export default app;
