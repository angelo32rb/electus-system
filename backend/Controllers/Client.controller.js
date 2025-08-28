import debugLogger from "../Utils/DebugLogger.js";
import ElectusInventoryModel from "../Models/ElectusInvetory.model.js";

const ClientController = {
  getUserSpreadsheetWithData: async (req, res) => {
    const { type } = req.params;
    if (!type || (type !== "normal" && type !== "order")) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const userId = req.user.id;
      const result = await ElectusInventoryModel.getUserRowsWithCellSheet(
        userId,
        type
      );

      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(200).json({
        status: true,
        userSpreadsheetData: result.data,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js getUserSpreadsheetWithData: " +
          err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  getUserSpreadsheet: async (req, res) => {
    const { type } = req.params;

    if (!type || (type !== "normal" && type !== "order")) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const userId = req.user.id;
      const result = await ElectusInventoryModel.getUserSpreadsheet(
        userId,
        type
      );
      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(200).json({
        status: true,
        spreadsheet: result.spreadsheets[0],
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js getUserSpreadsheet: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  getUserSpreadsheetColumns: async (req, res) => {
    const { type } = req.params;
    if (!type || (type !== "normal" && type !== "order")) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const userId = req.user.id;
      const result = await ElectusInventoryModel.getUserColumnsSheet(
        userId,
        type
      );

      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }
      return res.status(200).json({
        status: true,
        columns: result.columns,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js getUserSpreadsheetColumns: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  createUserNormalSpreadsheet: async (req, res) => {
    const { sheetName } = req.body;

    if (!sheetName) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const userId = req.user.id;
      const platformName = req.user.platform;
      const hasSpreadsheet = await ElectusInventoryModel.getUserSpreadsheet(
        userId,
        "normal"
      );

      if (hasSpreadsheet.success) {
        return res.status(409).send({
          status: false,
          message: "The user already has a spreadsheet.",
        });
      }

      const createSpreadsheet = await ElectusInventoryModel.createSpreadsheet(
        userId,
        sheetName,
        "normal",
        platformName
      );

      if (!createSpreadsheet.success) {
        return res.status(409).send({
          status: false,
          message: createSpreadsheet.message,
        });
      }

      return res.status(201).send({
        status: true,
        message: "The spreadsheet has been made successfully.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js createUserNormalSpreadsheet: " +
          err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  createUserOrderSpreadsheet: async (req, res) => {
    const { sheetName } = req.body;

    if (!sheetName) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const userId = req.user.id;
      const platformName = req.user.platform;
      const hasSpreadsheet = await ElectusInventoryModel.getUserSpreadsheet(
        userId,
        "order"
      );

      if (hasSpreadsheet.success) {
        return res.status(409).send({
          status: false,
          message: "The user already has an order spreadsheet.",
        });
      }

      const createSpreadsheet = await ElectusInventoryModel.createSpreadsheet(
        userId,
        sheetName,
        "order",
        platformName
      );

      if (!createSpreadsheet.success) {
        return res.status(409).send({
          status: false,
          message: createSpreadsheet.message,
        });
      }

      return res.status(201).send({
        status: true,
        message: "The spreadsheet has been made successfully.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js createUserOrderSpreadsheet: " +
          err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  createUserNormalSpreadsheetColumns: async (req, res) => {
    let { columns } = req.body;
    if (!columns || columns.length === 0) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }
    try {
      const userId = req.user.id;
      const userNormalSpreadsheet =
        await ElectusInventoryModel.getUserSpreadsheet(userId, "normal");

      if (!userNormalSpreadsheet.success) {
        return res.status(404).json({
          status: false,
          message: userNormalSpreadsheet.message,
        });
      }
      console.log(userNormalSpreadsheet.spreadsheets[0].id);
      columns = JSON.parse(columns);
      const createdColumns =
        await ElectusInventoryModel.createSpreadsheetColumns(
          columns,
          userNormalSpreadsheet.spreadsheets[0].id
        );

      if (!createdColumns.success) {
        return res.status(409).json({
          status: false,
          message: createdColumns.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: "The column/s have been added to your spreadsheet.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js createUserNormalSpreadsheetColumns: " +
          err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err,
      });
    }
  },
  createUserOrderSpreadsheetColumns: async (req, res) => {
    let { columns } = req.body;
    if (!columns || columns.length === 0) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }
    try {
      const userId = req.user.id;
      const userNormalSpreadsheet =
        await ElectusInventoryModel.getUserSpreadsheet(userId, "order");

      if (!userNormalSpreadsheet.success) {
        return res.status(404).json({
          status: false,
          message: userNormalSpreadsheet.message,
        });
      }
      console.log(userNormalSpreadsheet.spreadsheets[0].id);
      columns = JSON.parse(columns);
      const createdColumns =
        await ElectusInventoryModel.createSpreadsheetColumns(
          columns,
          userNormalSpreadsheet.spreadsheets[0].id
        );

      if (!createdColumns.success) {
        return res.status(409).json({
          status: false,
          message: createdColumns.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: "The column/s have been added to your spreadsheet.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js createUserNormalSpreadsheetColumns: " +
          err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err,
      });
    }
  },
  addUserNormalSpreadsheetData: async (req, res) => {
    let { data } = req.body;
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      data = JSON.parse(data);
      const userId = req.user.id;
      const spreadsheetResult = await ElectusInventoryModel.getUserSpreadsheet(
        userId,
        "normal"
      );

      if (!spreadsheetResult.success) {
        return res.status(404).json({
          status: false,
          message: spreadsheetResult.message,
        });
      }

      let spreadsheetId = spreadsheetResult.spreadsheets[0].id;
      const columnsResult = await ElectusInventoryModel.getUserColumnsSheet(
        userId,
        "normal"
      );

      if (!columnsResult.success) {
        return res.status(404).json({
          status: false,
          message: columnsResult.message,
        });
      }

      const dataColumns = Object.keys(data);
      for (const colName of dataColumns) {
        if (!columnsResult.columns.some((col) => col.column_name === colName)) {
          return res.status(422).json({
            status: false,
            message: `Column '${colName}' does not exist in the spreadsheet`,
          });
        }
      }

      const insertedData = await ElectusInventoryModel.insertDataCellWithRow(
        data,
        spreadsheetId,
        columnsResult.columns
      );

      if (!insertedData.success) {
        return res.status(409).json({
          status: false,
          message: insertedData.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Data added successfully",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js addDataWithRow: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err,
      });
    }
  },

  addUserOrderSpreadsheetData: async (req, res) => {
    let { data } = req.body;
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      data = JSON.parse(data);
      const userId = req.user.id;
      const spreadsheetResult = await ElectusInventoryModel.getUserSpreadsheet(
        userId,
        "order"
      );

      if (!spreadsheetResult.success) {
        return res.status(404).json({
          status: false,
          message: spreadsheetResult.message,
        });
      }

      let spreadsheetId = spreadsheetResult.spreadsheets[0].id;
      const columnsResult = await ElectusInventoryModel.getUserColumnsSheet(
        userId,
        "order"
      );

      if (!columnsResult.success) {
        return res.status(404).json({
          status: false,
          message: columnsResult.message,
        });
      }

      const dataColumns = Object.keys(data);
      for (const colName of dataColumns) {
        if (!columnsResult.columns.some((col) => col.column_name === colName)) {
          return res.status(422).json({
            status: false,
            message: `Column '${colName}' does not exist in the spreadsheet`,
          });
        }
      }

      const insertedData = await ElectusInventoryModel.insertDataCellWithRow(
        data,
        spreadsheetId,
        columnsResult.columns
      );

      if (!insertedData.success) {
        return res.status(409).json({
          status: false,
          message: insertedData.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Data added successfully",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Client.controller.js addDataWithRow: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err,
      });
    }
  },
};

export default ClientController;
