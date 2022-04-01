import postgres from "postgres";
import { envVars } from "./env-variables";

const dbConnectionSettings = {
  host: envVars.dbHostname,
  port: envVars.dbPort,
  password: envVars.dbPassword,
  username: envVars.dbUsername,
  database: "",
};

const sql =
  envVars.mode === "production"
    ? postgres(envVars.dbUri, { ssl: { rejectUnauthorized: false } })
    : postgres(dbConnectionSettings);

export default sql;
