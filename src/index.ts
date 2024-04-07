import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error";
import { SignupSchema } from "./schema/users";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// prisma Client
export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignupSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

// Error Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
