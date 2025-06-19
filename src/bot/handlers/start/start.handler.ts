import { Context } from "telegraf";
import UserController from "@controller/UserController";
import { keyboards } from "@infrastructure/telegram/keyboard";
import userActionsLogger from "@infrastructure/logger/userActionsLogger";

export const handleStart = async (ctx: Context) => {
  const meta = {
    userId: ctx.from?.id,
    username: ctx.from?.username,
  };

  try {
    const accountId = ctx.from?.id;
    const username = ctx.from?.username ?? null;

    if (!accountId) {
      userActionsLogger(
        "error",
        "handleStart",
        "Не удалось определить Telegram ID пользователя",
        meta
      );
      return ctx.reply("⚠️ Не удалось определить ваш Telegram ID");
    }

    await UserController.register(accountId, username);

    await ctx.reply(`👋 Восап хоуми`, keyboards.main);

    userActionsLogger("info", "handleStart", "Пользователь нажал /start", meta);
  } catch (error) {
    await ctx.reply("🚫 Произошла ошибка. Попробуйте позже.");

    userActionsLogger(
      "error",
      "handleStart",
      `Произошла ошибка при выполнении /start: ${(error as Error).message}`,
      meta
    );
  }
};
