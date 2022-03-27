import express from "express";
import { deletePost } from "./controllers";
import getPosts from "./controllers/get-posts";
import newPost from "./controllers/new-post";
import updatePost from "./controllers/update-post";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);

postsRouter.post("/new", newPost);

postsRouter.patch("/:id", updatePost);

postsRouter.delete("/:id", deletePost);

export default postsRouter;
