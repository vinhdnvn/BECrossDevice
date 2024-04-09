import { Request, Response } from "express";
import { prismaClient } from "..";
import { CommentSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
// import { User } from "@prisma/client";

export const createComment = async (req: any, res: Response) => {
  // CommentSchema.parse(req.body);
  // // let user: User;

  try {
    const user = req.user;
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await prismaClient.comment.create({
      data: {
        content: content,
        User: {
          connect: {
            id: user.id,
          },
        },
        Post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        User: true,
        Post: true,
      },
    });
    res.json({
      userId: user.id,
      postId: postId,
      content: content,
      message: "Comment created successfully",
    });
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);
  }
};

export const createGroup = async (req: any, res: Response) => {
  try {
    const user = req.user;
    const { nameGroup } = req.body;
    const group = await prismaClient.group.create({
      data: {
        nameGroup: nameGroup,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        User: true,
      },
    });
    res.json(group);
  } catch (error) {
    throw new NotFoundException("Error in Group Create", ErrorCodes.USER_NOT_FOUND);
  }
};

// export const
