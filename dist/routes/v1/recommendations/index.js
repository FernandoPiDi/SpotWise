import express from "express";
export const recommendationsRouter = express.Router();
recommendationsRouter.get("/", (req, res) => {
    res.send("Hello, world!");
});
