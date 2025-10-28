import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool.on("connect", () => {
  console.log("conneted to PostgreSQL");
});

export default pool;
