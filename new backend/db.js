const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "sabir_user",
  password: process.env.DB_PASSWORD || "sabir_pass",
  database: process.env.DB_NAME || "sabir_autos",
});

pool.connect()
  .then(() => console.log("PostgreSQL connected ✅"))
  .catch((err) => console.error("PostgreSQL connection error ❌", err));

module.exports = pool;