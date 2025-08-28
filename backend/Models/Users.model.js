import pool from "../Config/MySQLConnection.js";
import debugLogger from "../Utils/DebugLogger.js";
import generatePassword from "../Utils/PasswordGenerator.js";
import {
  encryptWithRandomIV,
  encryptWithFixedIV,
  decrypt,
  hashString,
} from "../Utils/CryptoUtils.js";

// Models
import RanksModel from "./Ranks.model.js";
import PlatformsModel from "./Platforms.model.js";

const UserModel = {
  validShopName: async (shopName) => {
    try {
      const [result] = await pool.query(
        "SELECT p.platform_name FROM platforms p JOIN users u ON p.id = u.platform_id WHERE u.shop_name = ?",
        [shopName]
      );

      if (result.length === 0 || result[0].platform_name === "none") {
        return {
          success: false,
          message: "The user doesn't have any platform synchronized yet.",
        };
      }
      return {
        success: true,
        platform: result[0],
      };
    } catch (err) {
      debugLogger.error("Error fetching user platform: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  getShop: async (shopName) => {
    try {
      const [results] = await pool.query(
        "SELECT * FROM users WHERE shop_name = ?",
        [shopName]
      );

      if (results.length === 0) {
        return {
          success: true,
          message: "There isn't any shop with this name created yet.",
        };
      }

      return {
        success: false,
        message: "There's already a shop with this name.",
      };
    } catch (err) {
      debugLogger.error("Error fetching shop by its shop name: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  getUserByUsername: async (username) => {
    try {
      const [results] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (results.length === 0) {
        return {
          success: true,
          message: "There isn't any user with this username created yet.",
        };
      }

      return {
        success: false,
        message: "There's already an user with this username.",
      };
    } catch (err) {
      debugLogger.error("Error fetching user by its username: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  getTokenAndEmailByUsername: async (username) => {
    try {
      const [results] = await pool.query(
        "SELECT email, token FROM users WHERE username = ?",
        [username]
      );

      if (results.length === 0) {
        return {
          success: false,
          message: "There isn't any account with that username",
        };
      }

      return {
        success: true,
        accountInformation: results[0],
      };
    } catch (err) {
      debugLogger.error(
        "Error fetching user information by its username: \n" + err
      );
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  updatePasswordAndToken: async (password, token, username) => {
    try {
      const [getUserAccount] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (getUserAccount.length === 0) {
        return {
          success: false,
          message: "It doesn't exist any user with that username.",
        };
      }

      let encryptedDBToken = getUserAccount[0].token;
      let decryptedDBToken = decrypt(encryptedDBToken);

      if (!decryptedDBToken || decryptedDBToken !== token) {
        return {
          success: false,
          message: "The token is invalid for this username",
        };
      }

      let encryptedPassword = getUserAccount[0].password;
      let decryptedPassword = decrypt(encryptedPassword);

      const hashedPassword = hashString(password);
      if (hashedPassword === decryptedPassword) {
        return {
          success: false,
          message: "You're already using this password.",
        };
      }
      let randomChars = generatePassword();
      const newToken = hashString(
        `${process.env.USER_TOKEN_SIGN}#${hashedPassword}#${randomChars}`
      );
      const encryptedNewToken = encryptWithFixedIV(newToken);
      const encryptedNewPassword = encryptWithRandomIV(hashedPassword);
      try {
        const [updated] = await pool.query(
          "UPDATE users SET password = ?, token = ? WHERE token = ? AND username = ?",
          [encryptedNewPassword, encryptedNewToken, encryptedDBToken, username]
        );

        return {
          success: true,
          message: "The password has been updated.",
        };
      } catch (err) {
        debugLogger.error(
          "Error while updating user password and token: \n" + err
        );
        return {
          success: false,
          message: "Database error",
          error: err.message,
        };
      }
    } catch (err) {
      debugLogger.error(
        "Error while fetching user's password with its token: \n" + err
      );
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  authenticateUser: async (username, password) => {
    try {
      const [getUserAccount] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (getUserAccount.length === 0) {
        return {
          success: false,
          message: "Invalid username",
        };
      }

      let userPassword = getUserAccount[0].password;
      let decryptedPassword = decrypt(userPassword);
      const hashedPassword = hashString(password);

      if (decryptedPassword !== hashedPassword) {
        return {
          success: false,
          message: "Invalid password",
        };
      }
      let userEncryptedToken = getUserAccount[0].token;
      let userDecryptedToken = decrypt(userEncryptedToken);

      try {
        const [userInfo] = await pool.query(
          "SELECT * FROM user_full WHERE token = ?",
          [userEncryptedToken]
        );

        if (userInfo.length === 0) {
          return {
            success: false,
            message: "Invalid user token",
          };
        }

        userInfo[0].token = userDecryptedToken;

        return {
          success: true,
          message: "User has been succesfully authenticated.",
          accountInformation: userInfo[0],
        };
      } catch (err) {
        debugLogger.error(
          "Error while fetching user information after authentication: \n" + err
        );
        return {
          success: false,
          message: "Database error",
          error: err.message,
        };
      }
    } catch (err) {
      debugLogger.error("Error while fetching user's password: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  insertUser: async (username, email, shopName, rank, platform) => {
    const isUserTaken = await UserModel.getUserByUsername(username);
    if (!isUserTaken.success) {
      return {
        success: false,
        message: isUserTaken.message,
      };
    }

    let platformId;

    if (rank === "admin") {
      const nonePlatformId = await PlatformsModel.getPlatformIdByName("none");
      if (!nonePlatformId.success) {
        return {
          success: false,
          message: nonePlatformId.message,
        };
      }

      platformId = nonePlatformId;

      shopName = "none";
    }

    if (rank === "client") {
      if (shopName === "none") {
        return {
          success: false,
          message: "The user must have a name for its shop.",
        };
      }
      if (platform === "none") {
        return {
          success: false,
          message: "The user must have a platform to begin with.",
        };
      }
      const isShopNameTaken = await UserModel.getShop(shopName);
      if (!isShopNameTaken.success) {
        return {
          success: false,
          message: isShopNameTaken.message,
        };
      }

      platformId = await PlatformsModel.getPlatformIdByName(platform);
      if (!platformId.success) {
        return {
          success: false,
          message: platformId.message,
        };
      }
    }

    const rankId = await RanksModel.getRankIdByName(rank);
    if (!rankId.success) {
      return {
        success: false,
        message: rankId.message,
      };
    }

    let password = generatePassword();
    let hashedPassword = hashString(password);
    let randomChars = generatePassword();
    let token = hashString(
      `${process.env.USER_TOKEN_SIGN}#${hashedPassword}#${randomChars}`
    );

    let encryptedPassword = encryptWithRandomIV(hashedPassword);
    let encryptedToken = encryptWithFixedIV(token);

    try {
      const [results] = await pool.query(
        "INSERT INTO users (username, password, email, shop_name, token, rank_id, platform_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          username,
          encryptedPassword,
          email,
          shopName,
          encryptedToken,
          rankId.rankId,
          platformId.platformId,
        ]
      );
      if (results.insertId) {
        return {
          success: true,
          message: "The user has been inesrted in the database",
          password: password,
        };
      }
    } catch (err) {
      debugLogger.error("Error trying to insert a new user: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  hasPermission: async (action, userId) => {
    try {
      const [results] = await pool.query(
        `SELECT * FROM user_permissions WHERE user_id = ? AND actions = ?`,
        [userId, action]
      );

      if (results.length === 0) {
        return false;
      }

      return true;
    } catch (err) {
      debugLogger.error("Error fetching user permissions: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  findUserByToken: async (token) => {
    let encryptedToken = encryptWithFixedIV(token);
    try {
      const [results] = await pool.query(
        `SELECT * FROM user_full WHERE token = ?`,
        [encryptedToken]
      );

      if (results.length === 0) {
        return false;
      }
      return results[0];
    } catch (err) {
      debugLogger.error("Error fetching user with token: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
};

export default UserModel;
