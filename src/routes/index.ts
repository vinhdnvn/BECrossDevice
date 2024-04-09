import { Router } from "express";
import authRouters from "./auth";
import postRoutes from "./posts";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouters);
rootRouter.use("/posts", postRoutes);

export default rootRouter;
