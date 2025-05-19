import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import router from "./routers";
import { errorHandler } from "./error";

dotenv.config();

const PORT = process.env.PORT ?? 5001;

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL_LOCAL!,
      process.env.CLIENT_URL_PUBLIC!,
      process.env.CLIENT_URL_LOCAL_EN!,
      process.env.CLIENT_URL_LOCAL_UK!,
      process.env.CLIENT_URL_PUBLIC_EN!,
      process.env.CLIENT_URL_PUBLIC_UK!,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Autorization"],
  })
);

connectDB();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
