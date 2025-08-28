import winston from "winston";
import fs from "fs";
import path from "path";

const logsDir = "debugging";

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const debugLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // Archivo solo para debug
    new winston.transports.File({
      filename: path.join(logsDir, "debug.log"),
      level: "debug",
    }),
  ],
});

export default debugLogger;
