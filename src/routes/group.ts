import { Router } from "express";
import { createGroup } from "../controllers/user";
import authMiddleware from "../middlewares/auth";

const groupRouters: Router = Router();

// create new group
groupRouters.post("/", [authMiddleware], createGroup);

export default groupRouters;
