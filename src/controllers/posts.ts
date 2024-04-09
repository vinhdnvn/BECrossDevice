import { Request, Response } from "express";
import { prismaClient } from "..";

export const createPost = async (req: Request, res: Response) => {
  //  example type of Post : ["math", "science", "english"]

  // Create a validator for this request

  const post = await prismaClient.post.create({
    data: {
      ...req.body,
      type: req.body.type.join(","),
    },
  });

  res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prismaClient.post.findMany();
  res.json(posts);
};
