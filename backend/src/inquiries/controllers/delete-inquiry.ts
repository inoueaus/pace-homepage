import { Request, Response } from "express";
import sql from "../../db";

const deleteInquiry = async (req: Request, res: Response) => {
  const inquiryId = Number(req.params.id);

  try {
    if (isNaN(inquiryId)) throw TypeError("Inquiry ID is not a number.");

    const [result] = await sql`DELETE FROM inquiries
    WHERE inquiry_id = ${inquiryId}
    RETURNING inquiry_id AS id`;

    if (!result) throw Error("Specified ID not in DB.");

    res.status(200).json({ id: result.id, deleted: true });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      deleted: false,
    });
  }
};

export default deleteInquiry;
