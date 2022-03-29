import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import postsRouter from "./posts";
import usersRouter from "./users";
import inquiriesRouter from "./inquiries";
import { envVars } from "./env-variables";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser(envVars.tokenKey));
app.use(
  cors({
    origin: envVars.nextServerUrl,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/inquiries", inquiriesRouter);

app.get("/", (req, res) => {
  res.send("PACE API");
});

export default app;
