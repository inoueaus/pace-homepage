import { Request, Response } from "express";
import sql from "../../db";

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const newInquiry = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const body = req.body.body;

  try {
    if (typeof firstName !== "string" || firstName.length > 255)
      throw TypeError("First Name Error.");
    if (typeof lastName !== "string" || lastName.length > 255)
      throw TypeError("Last Name Error.");
    if (
      typeof email !== "string" ||
      !validateEmail(email) ||
      email.length > 255
    )
      throw TypeError("Invalid Email.");
    if (typeof phone !== "string" || phone.length > 255)
      throw TypeError("Last Name Error.");
    if (typeof body !== "string" || body.length > 1000)
      throw TypeError("Last Name Error.");

    const [result] =
      await sql`INSERT INTO inquiries (first_name, last_name, email, phone, body)
    VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${body})
    RETURNING inquiry_id;`;

    res.status(201).json({ created: true, id: result.inquiry_id });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      created: false,
    });
  }
};

export default newInquiry;
