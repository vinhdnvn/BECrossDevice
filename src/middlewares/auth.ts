import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  // 1. extract the token from the header
  const token = req.headers.authorization;

  // 2. if token is not present, throw an error
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }

  try {
    // 3. verify the token
    const payload = jwt.verify(token, JWT_SECRET) as any;

    // 4. get user from payload
    const user = await prismaClient.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
    }

    // 5. attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
};

export default authMiddleware;
