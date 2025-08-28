import pool from "../Config/MySQLConnection.js";
import {
  decrypt,
  encryptWithFixedIV,
  hashString,
} from "../Utils/CryptoUtils.js";
import generatePassword from "../Utils/PasswordGenerator.js";
import debugLogger from "../Utils/DebugLogger.js";
import PlatformsModel from "./Platforms.model.js";

const APIKeysModel = {
  validateApiKey: async (apiKey) => {
    const encryptedApiKey = encryptWithFixedIV(apiKey);
    try {
      const [apiData] = await pool.query(
        `
          SELECT up.platform_name, ak.api_key, u.shop_name
          FROM api_keys ak 
          INNER JOIN platforms up ON ak.platform_id = up.id
          INNER JOIN users u ON ak.user_id = u.id
          WHERE ak.api_key = ?
        `,
        [encryptedApiKey]
      );

      if (apiData.length === 0) {
        return {
          success: false,
          message: "Invalid api key.",
        };
      }

      return {
        success: true,
        apiContext: apiData[0],
      };
    } catch (err) {
      debugLogger.error("Error fetching the api key:\n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  createAPIKey: async (userId, platformName) => {
    const randomApiKey = generatePassword();
    const hashedApiKey = hashString(
      `${randomApiKey}#${process.env.ELECTUS_API_TOKEN_SIGN}`
    );
    const encryptedApiKey = encryptWithFixedIV(hashedApiKey);
    const platformId = await PlatformsModel.getPlatformIdByName(platformName);

    if (!platformId.success) {
      return {
        success: false,
        message: "There's no platform available with that platform name",
      };
    }
    try {
      const [insertApiKey] = await pool.query(
        "INSERT INTO api_keys (api_key, platform_id, user_id) VALUES (?, ?, ?) ",
        [encryptedApiKey, platformId.platformId, userId]
      );

      return {
        success: true,
        apiKeyId: insertApiKey.insertId,
      };
    } catch (err) {
      debugLogger.error(
        "Error creating API key for " + platformName + ": \n" + err
      );
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
};

export default APIKeysModel;
