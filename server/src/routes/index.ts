import { Router } from "express";

import { v1Router } from "./v1";

export const router = Router();

// Add a default route that answers Hello World to all requests
router.get("/", (_req, res) => {
    res.json({ message: "Hello World" });
});
router.use("/v1", v1Router);
