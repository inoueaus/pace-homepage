import { Router } from "express";
import getInquiries from "./controllers/get-inquiries";
import getSingleInquiry from "./controllers/get-single-inquiry";

const inquiriesRouter = Router();

inquiriesRouter.get("/", getInquiries);

inquiriesRouter.get("/:id", getSingleInquiry);

inquiriesRouter.post("/new");

inquiriesRouter.delete("/:id");

export default inquiriesRouter;
