import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { googleRouter } from "./googleRoutes.js";
dotenv.config();
const app = express();
app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

app.use("/api/v1", googleRouter);

app.listen(5000, () => console.log("Server running on 5000"));
