import { Request, Response } from "express";
import { prismaClient } from "..";
import {hashSync} from 'bcrypt'

export const login = (req:Request, res:Response) => {
  res.send("Login successfull");

}

export const signup = async (req:Request, res:Response) => {
  const {email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({where:{ email}})
  if (user) {
    throw Error("User already exists");
    console.log("User already exists");

  }
  user = await prismaClient.user.create({
    data:{
      email,
      name,
      password:hashSync(password, 10)
    }

  })
  res.json(user);

}