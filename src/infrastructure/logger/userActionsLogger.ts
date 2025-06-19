import logWithContext from "./logWithContext";
import { userActionsLoggerInstance } from "./index";

const userActionsLogger = (
  level: "info" | "warn" | "error",
  scope: string,
  message: string,
  meta?: any
) => {
  logWithContext(userActionsLoggerInstance, level, scope, message, meta);
};

export default userActionsLogger;
