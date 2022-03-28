import { Router } from "express";
import getInquiries from "./controllers/get-inquiries";
import getSingleInquiry from "./controllers/get-single-inquiry";
import newInquiry from "./controllers/new-inquiry";
import deleteInquiry from "./controllers/delete-inquiry";

const inquiriesRouter = Router();

inquiriesRouter.get("/", getInquiries);

inquiriesRouter.get("/:id", getSingleInquiry);

inquiriesRouter.post("/new", newInquiry);

inquiriesRouter.delete("/:id", deleteInquiry);

export default inquiriesRouter;
