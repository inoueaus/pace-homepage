import express from "express";
import checkIfTokenIsValid from "../middleware/authentication";
import deletePost from "./controllers/delete-post";
import getPosts from "./controllers/get-posts";
import newPost from "./controllers/new-post";
import updatePost from "./controllers/update-post";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);

postsRouter.post("/new", checkIfTokenIsValid, newPost);

postsRouter.patch("/:id", checkIfTokenIsValid, updatePost);

postsRouter.delete("/:id", checkIfTokenIsValid, deletePost);

export default postsRouter;
