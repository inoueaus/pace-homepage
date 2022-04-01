import { RequestHandler } from "express";
import sql from "../../db";

const updateInquiry: RequestHandler = async (req, res) => {
  const viewed = req.body.viewed;
  const id = Number(req.params.id);

  try {
    if (typeof viewed !== "boolean")
      throw TypeError("Viewed property must be boolean.");
    if (isNaN(id)) throw TypeError("Id must be number");

    const [result] = await sql`UPDATE inquiries SET viewed = ${viewed}
    WHERE inquiry_id = ${id} RETURNING inquiry_id AS id`;

    if (!result.id) throw Error("Database did not return inquiry ID.");

    res.status(200).json({ id: result.id, updated: true });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      created: false,
    });
  }
};

export default updateInquiry;
