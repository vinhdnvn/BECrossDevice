import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from '@prisma/client';


const app: Express = express();


app.use(express.json());

app.use('/api', rootRouter)


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});


// prisma Client
export const prismaClient = new PrismaClient({
    log: ['query'],
});






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



