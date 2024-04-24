import { Router, Request, Response } from "express";
import { prismaClient } from "..";
import { escape } from "lodash";

const searchRoutes: Router = Router();

searchRoutes.get("/", async (req: Request, res: Response) => {
  //  convert query to string  const { query } = req.body;
  const { query } = req.body;

  try {
    const posts = await prismaClient.post.findMany({
      where: {
        OR: [
          {
            questionContent: {
              contains: query,
            },
          },
          {
            title: {
              contains: query,
            },
          },
        ],
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error in Searching API" });
    console.error(error);
  }
});

export default searchRoutes;
