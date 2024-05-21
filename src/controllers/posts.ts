import { Request, Response } from "express";
import { prismaClient } from "..";
import exp from "constants";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const createPost = async (req: any, res: Response) => {
  //  example type of Post : ["math", "science", "english"]

  // Create a validator for this request
  const user = req.user;
  const post = await prismaClient.post.create({
    data: {
      ...req.body,
      user_id: user.id,
      type: req.body.type.join(","),
    },
  });

  res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prismaClient.post.findMany({
    include: {
      Comment: true,
      User: true,
    },
  });

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

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    //  with all Comment have in Post
    include: {
      Comment: true,
    },
  });
  let postCommentCount;
  if (post) {
    postCommentCount = post.Comment.length;
  }

  res.json({ post, postCommentCount });
};

// get all comments of a post
export const getComments = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const comments = await prismaClient.comment.findMany({
    where: {
      post_id: postId,
    },
    include: {
      User: true,
    },
  });
  res.json(comments);
};

// search top 5 posts related/ similar to query
export const searchPosts = async (req: Request, res: Response) => {
  const query = req.query.q;
  const posts = await prismaClient.post.findMany({
    where: {
      questionContent: {
        contains: query as string,
      },
    },
    take: 5,
  });
  res.json(posts);
};
