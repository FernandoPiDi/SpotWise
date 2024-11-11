import express, { Request, Response, NextFunction } from "express";
import cors from "cors"; // Import the cors package
import { appConfig } from "./configs";
import { router } from "./routes";
// import fs from 'fs';
// import https from 'https';

const app = express();
app.use(cors()); // Enable all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("Not found");
});

// const httpsOptions = {
//   key: fs.readFileSync('path/to/your/private.key'),
//   cert: fs.readFileSync('path/to/your/certificate.crt')
// };

// https.createServer(httpsOptions, app).listen(appConfig.app.port, '0.0.0.0', () => {
//   console.log(`Server is running on port ${appConfig.app.port} with HTTPS`);
// });

app.listen(appConfig.app.port, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
