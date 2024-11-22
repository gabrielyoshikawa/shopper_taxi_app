import { Router } from "express";
import { Request, Response } from "express";

export const apiRouter = Router();

apiRouter.get("/", (_req: Request, res: Response) => {
	res.send("Hello World!");
});