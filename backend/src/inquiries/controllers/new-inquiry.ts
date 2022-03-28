import { Request, Response } from "express";
import sql from "../../db";
import { envVars } from "../../env-variables";
import nodemailerMailgun from "../mailer/transporter";

const validateEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLocaleLowerCase()
  );

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
      throw TypeError("Phone Number Error.");
    if (typeof body !== "string" || body.length > 1000)
      throw TypeError("Body Error.");

    const [result] =
      await sql`INSERT INTO inquiries (first_name, last_name, email, phone, body)
    VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${body})
    RETURNING inquiry_id;`;

    if (!result) throw Error("Inquiry was not Created.");

    nodemailerMailgun
      .sendMail({
        from: envVars.receiverEmail,
        to: envVars.receiverEmail,
        subject: "新しいお問合せが届きました",
        text: `お問合せ番号：${result.inquiry_id}`,
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
    //.then(result => console.log(result));

    res.status(201).json({ created: true, id: result.inquiry_id });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      created: false,
    });
  }
};

export default newInquiry;
