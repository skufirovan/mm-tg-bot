import { Telegraf } from "telegraf";
import { config } from "dotenv";
import { startHandler, handleMenu, handleProfile } from "@bot/handlers";
import { BUTTONS } from "@infrastructure/telegram/keyboard";

config();

export const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(startHandler);

bot.hears(BUTTONS.MENU, handleMenu);
bot.hears(BUTTONS.PROFILE, handleProfile);
