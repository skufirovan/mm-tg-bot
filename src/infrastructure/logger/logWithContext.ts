import winston from "winston";

interface LogMeta {
  userId?: number;
  username?: string;
  text?: string;
}

const logWithContext = (
  logger: winston.Logger,
  level: "info" | "warn" | "error",
  scope: string,
  message: string,
  meta?: LogMeta
) => {
  const parts = [`[${scope}]`];

  if (meta?.userId) parts.push(`ID: ${meta.userId}`);
  if (meta?.username) parts.push(`@${meta.username}`);
  if (meta?.text) parts.push(`📩 "${meta.text}"`);

  logger.log(level, `${parts.join(" ")} — ${message}`);
};

export default logWithContext;
