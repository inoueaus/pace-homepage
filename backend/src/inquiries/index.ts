import { Router } from "express";
import getInquiries from "./controllers/get-inquiries";

const inquiriesRouter = Router();

inquiriesRouter.get("/", getInquiries);

inquiriesRouter.get("/:id");

inquiriesRouter.post("/new");

inquiriesRouter.delete("/:id");

export default inquiriesRouter;
