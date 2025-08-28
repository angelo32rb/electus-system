import "dotenv/config";
import MySQLTestConnection from "./Utils/MySQLTestConnection.js";
import app from "./app.js";
import debugLogger from "./Utils/DebugLogger.js";

let expressPort = process.env.EXPRESS_PORT;
let expressHost = process.env.EXPRESS_HOST;

try {
  const dbConnectionTest = await MySQLTestConnection();

  if (dbConnectionTest.status) {
    app.listen(expressPort, () => {
      console.log(dbConnectionTest.message);
      console.log(
        `✅ Backend running at: http://${expressHost}:${expressPort}`
      );
    });
  } else {
    console.error(dbConnectionTest.message);
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Error starting server: \n", error);
  process.exit(1);
}
