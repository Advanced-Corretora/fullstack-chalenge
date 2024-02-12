import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import router from "./routes/index";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_DB_URL as string;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
