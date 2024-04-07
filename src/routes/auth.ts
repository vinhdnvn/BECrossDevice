import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRouters: Router = Router();

authRouters.post("/login", errorHandler(login));

authRouters.post("/signup", errorHandler(signup));

export default authRouters;
