import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestException("Invalid password", ErrorCodes.INCORRECT_PASSWORD);
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ user, token });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  SignupSchema.parse(req.body);
  const { email, password, name, avatar, role } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    // use next function to call the error middleware flexible
    next(new BadRequestException("User already exist!", ErrorCodes.USER_ALREADY_EXISTS));
  }
  user = await prismaClient.user.create({
    data: {
      email,
      name,
      avatar,
      role,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

// me -> return the logged in user
export const me = async (req: any, res: Response, next: NextFunction) => {
  res.json(req.user);
};
