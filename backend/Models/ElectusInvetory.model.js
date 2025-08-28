import pool from "../Config/MySQLConnection.js";
import { decrypt } from "../Utils/CryptoUtils.js";
import APIKeysModel from "./APIKeys.model.js";
import debugLogger from "../Utils/DebugLogger.js";

const ElectusInventoryModel = {
  createSpreadsheet: async (userId, sheetName, type, platformName) => {
    const apiKey = await APIKeysModel.createAPIKey(userId, platformName);

    if (!apiKey.success) {
      return {
        success: false,
        message: "There was a problem while trying to create a new API key.",
      };
    }
    try {
      const [createUserSpreadsheet] = await pool.query(
        `INSERT INTO spreadsheets (sheet_name, api_key_id, user_id, type) VALUES (?, ?, ?, ?)`,
        [sheetName, apiKey.apiKeyId, userId, type]
      );

      return {
        success: true,
        message: "The user has successfully created his spreadsheet.",
      };
    } catch (err) {
      debugLogger.error("Error creating user spreadsheet: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  createSpreadsheetColumns: async (columns, spreadsheetId) => {
    try {
      for (const column of columns) {
        const [insertColumn] = await pool.query(
          "INSERT INTO columns_sheet (id_sheet, column_name) VALUES (?, ?)",
          [spreadsheetId, column]
        );
      }

      return {
        success: true,
        message: "The columns has been created.",
      };
    } catch (err) {
      debugLogger.error("Error creating user spreadsheet columns: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  insertDataCellWithRow: async (data, spreadsheetId, columns) => {
    try {
      const [rowInserResult] = await pool.query(
        "INSERT INTO rows_sheet (id_sheet) VALUES (?)",
        [spreadsheetId]
      );

      const rowId = rowInserResult.insertId;

      for (const [colName, value] of Object.entries(data)) {
        const column = columns.find((col) => col.column_name === colName);

        if (!column) {
          throw new Error(`Column '${colName}' not found`);
        }

        await pool.query(
          "INSERT INTO cells_sheet (value, id_column, id_row) VALUES (?, ?, ?)",
          [value, column.id, rowId]
        );
      }

      return {
        success: true,
        message: "The data has been inserted successfully in user spreadsheet.",
      };
    } catch (err) {
      debugLogger.error(
        "Error inserting cells data with a new row in user spreadsheet: \n" +
          err
      );
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  getUserSpreadsheet: async (userId, type) => {
    try {
      const [userSpreadsheets] = await pool.query(
        `
          SELECT s.id, ak.api_key, s.sheet_name, s.type
          FROM api_keys ak 
          INNER JOIN spreadsheets s 
          ON ak.id = s.api_key_id 
          WHERE s.user_id = ? AND s.type = ?
        `,
        [userId, type]
      );

      if (userSpreadsheets.length === 0) {
        return {
          success: false,
          message:
            "The user doesn't have any spreadsheet of type " +
            type +
            " created yet.",
        };
      }

      const decryptedSpreadsheets = userSpreadsheets.map((sheet) => ({
        ...sheet,
        api_key: decrypt(sheet.api_key),
      }));

      return {
        success: true,
        spreadsheets: decryptedSpreadsheets,
      };
    } catch (err) {
      debugLogger.error("Error fetching user spreadsheets: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
  getUserColumnsSheet: async (userId, type) => {
    try {
      const [results] = await pool.query(
        `
          SELECT cls.id, cls.column_name, cls.id_sheet 
          FROM columns_sheet cls 
          INNER JOIN spreadsheets sp ON cls.id_sheet = sp.id 
          WHERE sp.user_id = ? AND sp.type = ?;
        `,
        [userId, type]
      );

      if (results.length === 0) {
        return {
          success: false,
          message: "There isn't any columns created for this spreadsheet yet.",
        };
      }

      return {
        success: true,
        columns: results,
      };
    } catch (err) {
      debugLogger.error("Error fetching user columns sheet: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },

  getUserRowsWithCellSheet: async (userId, type) => {
    try {
      const [results] = await pool.query(
        `
          SELECT 
              rs.id AS id_row,
              cls.column_name AS column_name,
              cs.value
          FROM rows_sheet rs
          INNER JOIN cells_sheet cs 
              ON rs.id = cs.id_row
          INNER JOIN columns_sheet cls 
              ON cs.id_column = cls.id
              AND cls.id_sheet = rs.id_sheet
          INNER JOIN spreadsheets s 
              ON rs.id_sheet = s.id
          WHERE s.user_id = ? AND s.type = ?
        `,
        [userId, type]
      );

      if (results.length === 0) {
        return {
          success: false,
          message: "There isn't any data for this spreadsheet yet.",
        };
      }

      const grouped = results.reduce((acc, row) => {
        const columnKey = row.column_name;

        if (!acc[row.id_row]) {
          acc[row.id_row] = { id_row: row.id_row };
        }

        acc[row.id_row][columnKey] = row.value;

        return acc;
      }, {});

      return {
        success: true,
        data: Object.values(grouped),
      };
    } catch (err) {
      debugLogger.error("Error fetching user rows sheet: \n" + err);
      return {
        success: false,
        message: "Database error",
        error: err.message,
      };
    }
  },
};

export default ElectusInventoryModel;
