import { Router } from "express";
import { textRecognition } from "../controllers/ocr.controller";

const ocrRoutes: Router = Router();

ocrRoutes.post("/", textRecognition);

export default ocrRoutes;
