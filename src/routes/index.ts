import { Router } from "express";
import authRouters from "./auth";
import postRoutes from "./posts";
import commentRoutes from "./comment";
import groupRouters from "./group";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouters);
rootRouter.use("/posts", postRoutes);
rootRouter.use("/comment", commentRoutes);
rootRouter.use("/group", groupRouters);

export default rootRouter;
