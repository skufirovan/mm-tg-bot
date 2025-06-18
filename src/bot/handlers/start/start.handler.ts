import { Context } from "telegraf";
import UserController from "@controller/UserController";
import { keyboards } from "@infrastructure/telegram/keyboard";

export const startHandler = async (ctx: Context) => {
  const accountId = ctx.from?.id;
  const username = [ctx.from?.first_name, ctx.from?.last_name]
    .filter(Boolean)
    .join(" ");

  if (!accountId) {
    return ctx.reply("⚠️ Не удалось определить ваш Telegram ID");
  }

  await UserController.register(accountId, username);

  await ctx.reply(`👋 Восап хоуми`, keyboards.main);
};
