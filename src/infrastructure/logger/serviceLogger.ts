import logWithContext from "./logWithContext";
import { serviceLoggerInstance } from "./index";

const serviceLogger = (
  level: "info" | "warn" | "error",
  scope: string,
  message: string,
  meta?: any
) => {
  logWithContext(serviceLoggerInstance, level, scope, message, meta);
};

export default serviceLogger;
