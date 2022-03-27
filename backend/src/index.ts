import express from "express";
import dotenv from "dotenv";
import sql from "./db";
import { envVars } from "./env-variables"

dotenv.config();

const app = express();


app.get("/", (req, res) => {
  sql
  res.send("PACE API");
});

app.listen(envVars.apiPort, () => console.log(`Pace API is running on Port: ${envVars.apiPort}`));
