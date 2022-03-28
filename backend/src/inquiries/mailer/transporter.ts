import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const auth = {
  auth: {
    api_key: "6ab17df5ee912ac97919b83814d8ae96-8ed21946-90b754d2",
    domain: "sandbox855f632013ac4f6a97f988fc94fdbb24.mailgun.org",
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export default nodemailerMailgun;
