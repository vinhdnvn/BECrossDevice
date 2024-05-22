import { Request, Response } from "express";
import { prismaClient } from "..";
import { CommentSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { PrismaClient } from "@prisma/client";
// import { User } from "@prisma/client";

export const updateUser = async (req: any, res: Response) => {
  const { userID } = req.params;
  const { name, avatar, email } = req.body;
  try {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userID,
      },
      data: {
        name,
        avatar,
        email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    throw new NotFoundException(
      "Error in Update User",
      ErrorCodes.INTERNAL_ERROR
    );
  }
};

export const createComment = async (req: any, res: Response) => {
  // CommentSchema.parse(req.body);
  // // let user: User;

  try {
    const user = req.user;
    const { postId } = req.params;
    const { content, image } = req.body;
    console.log("image", image);
    const comment = await prismaClient.comment.create({
      data: {
        content: content,
        image: image,
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
      image: image,
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
    throw new NotFoundException(
      "Error in Group Create",
      ErrorCodes.USER_NOT_FOUND
    );
  }
};

export const topVoteTutor = async (req: any, res: Response) => {
  try {
    const tutor = await prismaClient.user.findMany({
      orderBy: {
        Rating_float: "desc",
      },
      where: {
        role: "tutor",
      },
      take: 5,
    });

    res.json(tutor);
  } catch (error) {
    throw new NotFoundException("Error in TopVote", ErrorCodes.INTERNAL_ERROR);
  }
};

export const getAllTutor = async (req: any, res: Response) => {
  try {
    const tutor = await prismaClient.user.findMany({
      where: {
        role: "tutor",
      },
    });
    res.json(tutor);
  } catch (error) {
    throw new NotFoundException(
      "Error in tutor list",
      ErrorCodes.INTERNAL_ERROR
    );
  }
};

export const updateTutor = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { Rating_float, Point_int } = req.body;
    const tutor = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        Rating_float: Rating_float,
        Point_int: Point_int,
      },
    });

    res.json(tutor);
  } catch (error) {
    throw new NotFoundException(
      "Error in Tutor Update",
      ErrorCodes.INTERNAL_ERROR
    );
  }
};

export const getAllStudent = async (req: any, res: Response) => {
  try {
    const student = await prismaClient.user.findMany({
      where: {
        role: "student",
      },
    });
    res.json(student);
  } catch (error) {
    throw new NotFoundException(
      "Error in Student list",
      ErrorCodes.USER_NOT_FOUND
    );
  }
};

export const updatePointStudent = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { Point_int } = req.body;
    const student = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        Point_int: Point_int,
      },
    });

    res.json(student);
  } catch (error) {
    throw new NotFoundException(
      "Error in Student Update Point",
      ErrorCodes.USER_NOT_FOUND
    );
  }
};
