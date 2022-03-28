import { Router } from "express";
import requireToken from "../middleware/authentication";
import getInquiries from "./controllers/get-inquiries";
import getSingleInquiry from "./controllers/get-single-inquiry";
import newInquiry from "./controllers/new-inquiry";

const inquiriesRouter = Router();

inquiriesRouter.get("/", getInquiries);

inquiriesRouter.get("/:id", getSingleInquiry);

inquiriesRouter.post("/new", requireToken, newInquiry);

inquiriesRouter.delete("/:id");

export default inquiriesRouter;
