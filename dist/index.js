import express from "express";
import { appConfig } from "./configs/config";
import { router } from "./routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use((_req, res, _next) => {
    res.status(404).send("Not found");
});
app.listen(appConfig.app.port, () => {
    console.log("Server is running on port 3000");
});
