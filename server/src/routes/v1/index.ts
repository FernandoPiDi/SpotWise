import { recommendationsRouter } from "./recommendations";
import { Router } from "express";


export const v1Router = Router();

v1Router.use("/recommendations", recommendationsRouter);