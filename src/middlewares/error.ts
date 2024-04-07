import { HttpException } from "../exceptions/root";
import { Request,Response,NextFunction } from "express";

export const errorMiddleware = (err:HttpException, req:Request, res:Response, next:NextFunction) => {
   
    res.status(err.statusCode || 500).json({
        message: err.message,
        errorCode: err.errorCode,
        errors: err.errors
    });
    next();

}