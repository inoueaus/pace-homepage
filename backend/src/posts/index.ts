import express from "express";
import { deletePost, getPostsByPage, newPost, updatePost } from "./controllers";
import getPosts from "./controllers/get-posts";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);

postsRouter.post("/new", newPost);

postsRouter.patch("/:id", updatePost);

postsRouter.delete("/:id", deletePost);

export default postsRouter;
