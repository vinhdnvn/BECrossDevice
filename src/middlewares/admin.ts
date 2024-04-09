// for admin permission

import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";

const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user.role == "admin") {
    next();
  } else {
    res.status(403).json({ message: "You are not allowed to access this route" });
    next(new UnauthorizedException("You are not allowed to access this route", ErrorCodes.UNAUTHORIZED));
  }
};

export default adminMiddleware;
