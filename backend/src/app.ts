import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import postsRouter from "./posts";
import usersRouter from "./users";
import inquiriesRouter from "./inquiries";
import { envVars } from "./env-variables";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cookieParser(envVars.tokenKey));
app.use(
  cors({
    origin: envVars.nextServerUrl,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/inquiries", inquiriesRouter);

app.get("/", (req, res) => {
  res.send("PACE API");
});

export default app;
