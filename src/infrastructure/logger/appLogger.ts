import logWithContext from "./logWithContext";
import { appLoggerInstance } from "./index";

const appLogger = (
  level: "info" | "warn" | "error",
  scope: string,
  message: string,
  meta?: any
) => {
  logWithContext(appLoggerInstance, level, scope, message, meta);
};

export default appLogger;
