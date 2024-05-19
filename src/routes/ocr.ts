import { Router } from "express";
import { textRecognition } from "../controllers/ocr.controller";

const ocrRoutes: Router = Router();

ocrRoutes.get("/", textRecognition);

export default ocrRoutes;
