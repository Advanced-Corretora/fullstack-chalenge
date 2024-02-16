import "express-async-errors";
import express from "express";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";

import routes from "./routes";
const cors = require("cors");

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors({ routes, credentials: true }));

  app.use(express.json());

  app.use(routes);

  app.use(errorMiddleware);

  return app.listen(process.env.PORT, () => {
    console.log("Server is running! 🚀");
  });
});
