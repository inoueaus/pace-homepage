import express from "express";
import requireToken from "../middleware/authentication";
import deletePost from "./controllers/delete-post";
import getPosts from "./controllers/get-posts";
import newPost from "./controllers/new-post";
import updatePost from "./controllers/update-post";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);

postsRouter.post("/new", requireToken, newPost);

postsRouter.patch("/:id", requireToken, updatePost);

postsRouter.delete("/:id", requireToken, deletePost);

export default postsRouter;
