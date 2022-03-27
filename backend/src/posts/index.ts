import express from "express";
import { deletePost, updatePost } from "./controllers";
import getPosts from "./controllers/get-posts";
import newPost from "./controllers/new-post";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);

postsRouter.post("/new", newPost);

postsRouter.patch("/:id", updatePost);

postsRouter.delete("/:id", deletePost);

export default postsRouter;
