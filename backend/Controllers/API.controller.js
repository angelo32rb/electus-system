import debugLogger from "../Utils/DebugLogger.js";

const APIController = {
  checkStatus: (req, res) => {
    return res.status(200).json({
      status: true,
      message: "The API Controller is working",
    });
  },
};

export default APIController;
