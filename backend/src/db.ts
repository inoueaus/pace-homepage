import postgres from "postgres";

const port = Number(process.env.DB_PORT);

if (
  !(
    typeof process.env.DB_HOST === "string" &&
    !isNaN(port) &&
    typeof process.env.DB_PASS === "string" &&
    typeof process.env.DB_USER === "string" &&
    typeof process.env.DB_NAME === "string"
  )
) {
  throw Error("DB Environment Variables Incomplete!")
}

const dbConnectionSettings = {
  host: process.env.DB_HOST,
  port,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
};

const sql = postgres(dbConnectionSettings);

export default sql;
