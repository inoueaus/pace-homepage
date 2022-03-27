import { Router } from "express";

const inquiriesRouter = Router();

inquiriesRouter.get("/");

inquiriesRouter.get("/:id");

inquiriesRouter.post("/new");

inquiriesRouter.delete("/:id");

export default inquiriesRouter;
