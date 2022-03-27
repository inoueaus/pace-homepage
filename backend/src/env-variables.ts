import dotenv from "dotenv";

dotenv.config();

const apiPort = Number(process.env.PORT);
const dbPort = Number(process.env.DB_PORT);
const mode = process.env.MODE as "development" | "production";

if (!(mode === "development" || mode === "production"))
  throw Error("Mode is incorrect!");
if (isNaN(apiPort)) throw Error("API Port Undefined!");
if (!process.env.DB_HOST) throw Error("DB host env var undefined!");
if (isNaN(dbPort)) throw Error("DB Port is undefined or not a number!");
if (!process.env.DB_PASS) throw Error("DB password is undefined!");
if (!process.env.DB_USER) throw Error("DB username is undefined!");
if (!process.env.DB_NAME) throw Error("DB name is undefined!");

export const envVars = {
  mode,
  apiPort,
  dbHostname: process.env.DB_HOST,
  dbPassword: process.env.DB_PASS,
  dbUsername: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort,
};
