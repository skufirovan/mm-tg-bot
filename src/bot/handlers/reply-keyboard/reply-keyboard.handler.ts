import { Context } from "telegraf";
import UserController from "@controller/UserController";
import { formatDateToDDMMYYYY } from "@utils/utils";

export const handleMenu = async (ctx: Context) => {
  await ctx.reply("⚙️ В разработке");
};

export const handleProfile = async (ctx: Context) => {
  const accountId = ctx.from?.id;

  if (!accountId) {
    return ctx.reply("⚠️ Не удалось определить ваш Telegram ID");
  }

  const user = await UserController.getByAccountId(accountId);

  if (!user) {
    return ctx.reply("⚠️ Вы не зарегистрированы.");
  }

  await ctx.reply(
    `👋 Привет, ${
      user.username
    }\n📆 Ты зарегистрировался ${formatDateToDDMMYYYY(
      user.registeredAt
    )}\n👑 Статус пасса: ${user.hasPass ? "активен" : "не активен"}`
  );
};
