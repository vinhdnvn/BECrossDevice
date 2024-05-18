import { Router } from "express";
import {
  getAllStudent,
  getAllTutor,
  topVoteTutor,
  updatePointStudent,
  updateTutor,
  updateUser,
} from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.put("/", updateUser);

// for Student
userRoutes.get("/student", getAllStudent);
userRoutes.put("/student/:id", updatePointStudent);

// for Tutor
userRoutes.get("/tutor", getAllTutor);
userRoutes.get("/", topVoteTutor);
userRoutes.put("/tutor/:id", updateTutor);

export default userRoutes;
