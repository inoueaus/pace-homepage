import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { envVars } from "../../env-variables";

const auth = {
  auth: {
    api_key: envVars.mailgunKey,
    domain: envVars.mailgunDomain,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export default nodemailerMailgun;
