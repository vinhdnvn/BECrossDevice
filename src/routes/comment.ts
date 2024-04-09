import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createComment } from "../controllers/user";
import authMiddleware from "../middlewares/auth";

const commentRoutes: Router = Router();

// create new comment base on post id and user id
commentRoutes.post("/:postId", [authMiddleware], createComment);

export default commentRoutes;
