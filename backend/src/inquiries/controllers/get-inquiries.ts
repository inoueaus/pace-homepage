import { Request, Response } from "express";
import sql from "../../db";

const getInquiries = async (req: Request, res: Response) => {
  const pageNo = req.query.page ? Number(req.query.page) : 0; // default page 1
  const limit = req.query.limit ? Number(req.query.limit) : 10; // default 10 per page

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const result =
      await sql`SELECT inquiry_id as id, body, email, phone, first_name as firstName, last_name as lastName, created_at as createdAt
    FROM inquiries
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${limit * pageNo}`;

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getInquiries;
