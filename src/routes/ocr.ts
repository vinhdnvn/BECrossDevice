import { Router } from "express";
import { textRecognition, textRecognitionAndSolvingProblem } from "../controllers/ocr.controller";

const ocrRoutes: Router = Router();

ocrRoutes.post("/", textRecognitionAndSolvingProblem);
ocrRoutes.post("/text", textRecognition);

export default ocrRoutes;
