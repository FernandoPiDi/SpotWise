import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "./configs/config";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("Not found");
});

app.listen(appConfig.app.port, () => {
  console.log("Server is running on port 3000");
});
