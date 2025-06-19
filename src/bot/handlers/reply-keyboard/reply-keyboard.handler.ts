import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import UserController from "@controller/UserController";
import { formatDateToDDMMYYYY } from "@utils/utils";
import userActionsLogger from "@infrastructure/logger/userActionsLogger";

export const handleMenu = async (ctx: Context) => {
  const isTextMessage = ctx.message && "text" in ctx.message;

  const meta = {
    userId: ctx.from?.id,
    username: ctx.from?.username,
    text: isTextMessage ? (ctx.message as Message.TextMessage).text : undefined,
  };

  await ctx.reply("⚙️ В разработке");

  userActionsLogger("info", "handleMenu", "Пользователь перешел в меню", meta);
};

export const handleProfile = async (ctx: Context) => {
  const accountId = ctx.from?.id;
  const isTextMessage = ctx.message && "text" in ctx.message;

  const meta = {
    userId: ctx.from?.id,
    username: ctx.from?.username,
    text: isTextMessage ? (ctx.message as Message.TextMessage).text : undefined,
  };

  try {
    if (!accountId) {
      userActionsLogger(
        "error",
        "handleProfile",
        "Не удалось определить Telegram ID пользователя",
        meta
      );
      return ctx.reply("⚠️ Не удалось определить ваш Telegram ID");
    }

    const user = await UserController.getByAccountId(accountId);

    if (!user) {
      userActionsLogger(
        "error",
        "handleProfile",
        "Пользователь не зарегистрирован",
        meta
      );
      return ctx.reply("⚠️ Вы не зарегистрированы.");
    }

    await ctx.reply(
      `👋 Привет, ${
        user.username ?? "игрок"
      }\n📆 Ты зарегистрировался ${formatDateToDDMMYYYY(
        user.registeredAt
      )}\n👑 Статус пасса: ${user.hasPass ? "активен" : "не активен"}`
    );

    userActionsLogger(
      "info",
      "handleProfile",
      "Пользователь перешел в профиль",
      meta
    );
  } catch (error) {
    await ctx.reply("🚫 Произошла ошибка. Попробуйте позже.");

    userActionsLogger(
      "error",
      "handleProfile",
      `Произошла ошибка при переходе в профиль: ${(error as Error).message}`,
      meta
    );
  }
};
