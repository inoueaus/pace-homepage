import dotenv from "dotenv";

dotenv.config();

const apiPort = Number(process.env.PORT);
const dbPort = Number(process.env.DB_PORT);
const mode = process.env.MODE as "development" | "production";
const salt = Number(process.env.SALT);
const dbUri = process.env.DATABASE_URL as string;

if (!(mode === "development" || mode === "production"))
  throw Error("Mode is incorrect!");
if (isNaN(apiPort)) throw Error("API Port Undefined!");
if (isNaN(salt)) throw Error("Salt Undefined!");
if (!process.env.DB_HOST) throw Error("DB_HOST is undefined!");
if (isNaN(dbPort)) throw Error("DB_PORT is undefined or not a number!");
if (!process.env.DB_PASS) throw Error("DB_PASS is undefined!");
if (!process.env.DB_USER) throw Error("DB_USER is undefined!");
if (!process.env.DB_NAME) throw Error("DB_NAME is undefined!");
if (!process.env.TOKEN_KEY) throw Error("TOKEN_KEY is undefined!");
if (!process.env.RECEIVER_EMAIL) throw Error("RECEIVER_EMAIL is undefined!");
if (!process.env.MAILGUN_KEY) throw Error("MAILGUN_KEY is undefined!");
if (!process.env.MAILGUN_DOMAIN) throw Error("MAILGUN_DOMAIN is undefined!");
if (!process.env.NEXT_SERVER_URL) throw Error("NEXT_SERVER_URL is undefined!");
if (!dbUri && mode === "production") throw Error("DB URI is undefined!");

export const envVars = {
  mode,
  apiPort,
  dbHostname: process.env.DB_HOST,
  dbPassword: process.env.DB_PASS,
  dbUsername: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbUri,
  dbPort,
  tokenKey: process.env.TOKEN_KEY,
  salt,
  receiverEmail: process.env.RECEIVER_EMAIL,
  mailgunKey: process.env.MAILGUN_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  nextServerUrl: process.env.NEXT_SERVER_URL,
};
