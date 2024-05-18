import { Router } from "express";
import authRouters from "./auth";
import postRoutes from "./posts";
import commentRoutes from "./comment";
import groupRouters from "./group";
import { searchPosts } from "../controllers/posts";
import searchRoutes from "./search";
import userRoutes from "./user";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouters);
rootRouter.use("/posts", postRoutes);
rootRouter.use("/comment", commentRoutes);
rootRouter.use("/group", groupRouters);
// searching
rootRouter.use("/search", searchRoutes);
rootRouter.use("/users", userRoutes);

export default rootRouter;
