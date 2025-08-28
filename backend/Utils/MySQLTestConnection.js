import pool from "../Config/MySQLConnection.js";

export default async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    return {
      status: true,
      message: "✅ Database connection succesfully tested",
    };
  } catch (err) {
    return {
      status: false,
      message:
        "❌ There was an error while trying to test the connection to the database",
    };
  }
}
