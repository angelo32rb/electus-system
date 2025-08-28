import pool from "../Config/MySQLConnection.js";
import debugLogger from "../Utils/DebugLogger.js";

const PlatformsModel = {
  getPlatformIdByName: async (platformName) => {
    try {
      const [results] = await pool.query(
        "SELECT id FROM platforms WHERE platform_name = ?",
        [platformName]
      );

      if (results.length === 0) {
        return {
          success: false,
          message: "There's no platform with that name",
        };
      }

      return {
        success: true,
        platformId: results[0].id,
      };
    } catch (err) {
      debugLogger.error("Error fetching platform id with its name: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
};

export default PlatformsModel;
