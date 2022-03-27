import express from "express";
import bcrypt from "bcryptjs";
import logoutUser from "./controllers/logout-user";
import { envVars } from "../env-variables";
import { loginUser } from "./controllers";
import addInstagram from "./controllers/add-instagram";
import requireToken from "../middleware/authentication";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => res.send("ping"));

usersRouter.post("/login", loginUser);

usersRouter.patch("/:id/instagram", requireToken, addInstagram);

usersRouter.post("/logout", logoutUser);

usersRouter.get("/gen-hash/:pass", (req, res) => {
  bcrypt.hash(req.params.pass, 10).then(hash => res.send(hash));
});

export default usersRouter;
