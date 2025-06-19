import { Context } from "telegraf";
import UserController from "@controller/UserController";
import { keyboards } from "@infrastructure/telegram/keyboard";

export const startHandler = async (ctx: Context) => {
  try {
    const accountId = ctx.from?.id;
    const username = ctx.from?.username ?? null;

    if (!accountId) {
      return ctx.reply("⚠️ Не удалось определить ваш Telegram ID");
    }

    await UserController.register(accountId, username);

    await ctx.reply(`👋 Восап хоуми`, keyboards.main);
  } catch (error) {
    await ctx.reply("🚫 Произошла ошибка. Попробуйте позже.");
  }
};
