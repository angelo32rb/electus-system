import pool from "../Config/MySQLConnection.js";
import debugLogger from "../Utils/DebugLogger.js";

const RanksModel = {
  getRankIdByName: async (rankName) => {
    try {
      const [results] = await pool.query(
        "SELECT id FROM ranks WHERE rank_name = ?",
        [rankName]
      );

      if (results.length === 0) {
        return {
          success: false,
          message: "There's no rank with that name",
        };
      }

      return {
        success: true,
        rankId: results[0].id,
      };
    } catch (err) {
      debugLogger.error("Error fetching rank id with its name: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
};

export default RanksModel;
