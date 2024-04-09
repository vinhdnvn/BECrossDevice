import { Router } from "express";
import { createPost, deletePost, getAllPosts, getComments, getPostById, updatePost } from "../controllers/posts";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
const postRoutes: Router = Router();

// create new post
postRoutes.post("/", errorHandler(createPost));
// Nếu cần validate -> postRoutes.post("/",[authMiddleware] ,errorHandler(createPost));
// or  postRoutes.post("/",[adminMiddleware, authMiddleware] ,errorHandler(createPost));
// get all posts
postRoutes.get("/", errorHandler(getAllPosts));
// delete post
postRoutes.delete("/:id", [authMiddleware], errorHandler(deletePost));
//update post
postRoutes.put("/:id", [authMiddleware], errorHandler(updatePost));
postRoutes.get("/:id", errorHandler(getPostById));
// get all comments of a post
postRoutes.get("/:postId/comment", getComments);

export default postRoutes;
