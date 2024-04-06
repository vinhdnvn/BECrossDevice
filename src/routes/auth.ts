import { Router } from "express";
import { login, signup } from "../controllers/auth";


const authRouters:Router = Router();

authRouters.get("/login", login);
authRouters.post("/signup", signup);


export default authRouters;