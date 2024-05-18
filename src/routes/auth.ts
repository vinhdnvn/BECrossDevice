import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRouters: Router = Router();

authRouters.post("/login", errorHandler(login));

authRouters.post("/signup", errorHandler(signup));
authRouters.get("/me", [authMiddleware], errorHandler(me));

// oauth
authRouters.get("/google", (req, res) => {
  res.send("Google oauth");
});

export default authRouters;
