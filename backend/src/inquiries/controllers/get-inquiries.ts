import { Request, Response } from "express";
import sql from "../../db";

interface InquiryDBRecord {
  inquiry_id: number;
  body: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const getInquiries = async (req: Request, res: Response) => {
  const pageNo = req.query.page ? Number(req.query.page) : 0; // default page 1
  const limit = req.query.limit ? Number(req.query.limit) : 10; // default 10 per page

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const result = await sql<
      InquiryDBRecord[]
    >`SELECT inquiry_id, body, email, phone, first_name, last_name, created_at
    FROM inquiries
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${limit * pageNo}`;

    res.json(
      result.map(inquiry => ({
        // must format to camel case as per JSON standards
        id: inquiry.inquiry_id,
        body: inquiry.body,
        phone: inquiry.phone,
        email: inquiry.email,
        firstName: inquiry.first_name,
        lastName: inquiry.last_name,
        createdAt: inquiry.created_at,
      }))
    );
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getInquiries;
