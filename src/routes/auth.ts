import { Router } from "express";
import { login } from "../controllers/auth";


const authRouters:Router = Router();

authRouters.get("/login", login);


export default authRouters;