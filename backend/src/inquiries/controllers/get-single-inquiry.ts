import { Request, Response } from "express";
import sql from "../../db";

const getSingleInquiry = async (req: Request, res: Response) => {
  const inquiryId = Number(req.params.id);

  try {
    if (isNaN(inquiryId)) throw Error("Inquiry ID must be a number.");

    const result =
      await sql`SELECT inquiry_id as id, body, email, phone, first_name as firstName, last_name as lastName, created_at as createdAt
    FROM inquiries
    WHERE inquiry_id = ${inquiryId}`;

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getSingleInquiry;
