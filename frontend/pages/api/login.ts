import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default function (req: NextApiRequest, res: NextApiResponse) {
  setCookie({ res }, "test", "test", {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.status(200).send("OK");
}
