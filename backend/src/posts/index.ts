import express from "express";
import { deletePost, getPostsByPage, newPost, updatePost } from "./controllers";

const postsRouter = express.Router();

postsRouter.get("/", getPostsByPage);

postsRouter.post("/new", newPost);

postsRouter.patch("/:id", updatePost);

postsRouter.delete("/:id", deletePost);

export default postsRouter;
