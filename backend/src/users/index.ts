import express from "express";
import bcrypt from "bcryptjs";
import { loginUser, logoutUser } from "./controllers";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => res.send("ping"));

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.get("/gen-hash/:pass", (req, res) => {
  bcrypt.hash(req.params.pass, 10, (err, hash) => res.json({ hash }));
});

export default usersRouter;
