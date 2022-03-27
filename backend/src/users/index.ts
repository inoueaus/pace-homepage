import express from "express";
import bcrypt from "bcryptjs";
import { loginUser } from "./controllers";
import logoutUser from "./controllers/logout-user";
import { envVars } from "../env-variables";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => res.send("ping"));

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.get("/gen-hash/:pass", (req, res) => {
  bcrypt.hash(req.params.pass, 10).then(hash => res.send(hash));
});

export default usersRouter;
