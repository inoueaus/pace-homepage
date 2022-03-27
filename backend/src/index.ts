import express from "express";
import dotenv from "dotenv";
import sql from "./db";
import { envVars } from "./env-variables";
import postsRouter from "./posts";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("PACE API");
});

app.listen(envVars.apiPort, () =>
  console.log(`Pace API is running on Port: ${envVars.apiPort}`)
);
