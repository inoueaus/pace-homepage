import express from "express";
import dotenv from "dotenv";
import { envVars } from "./env-variables";
import postsRouter from "./posts";
import usersRouter from "./users";
import inquiriesRouter from "./inquiries";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/inquiries", inquiriesRouter);

app.get("/", (req, res) => {
  res.send("PACE API");
});

app.listen(envVars.apiPort, () =>
  console.log(`Pace API is running on Port: ${envVars.apiPort}`)
);
