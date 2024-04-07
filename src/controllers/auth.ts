import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User not found");
    // next(new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND));
  }
  if (!compareSync(password, user.password)) {
    // next(new BadRequestException("Invalid password", ErrorCodes.INCORRECT_PASSWORD));
    throw Error("Invalid password");
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
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    // use next function to call the error middleware flexible
    next(new BadRequestException("User already exist!", ErrorCodes.USER_ALREADY_EXISTS));
  }
  user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};
