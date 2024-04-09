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

// delete post
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await prismaClient.post.delete({
    where: {
      id: postId,
    },
  });
  res.json({ message: "Post deleted", post });
};

// update post
export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      ...req.body,
    },
  });
  res.json({ message: "Post updated", post });
};
