import { Markup } from "telegraf";

export const BUTTONS = {
  MENU: "🎮 Меню",
  MY_CARDS: "🎴 Мои карты",
  PROFILE: "👤 Профиль",
};

export const keyboards = {
  main: Markup.keyboard([[BUTTONS.MENU, BUTTONS.PROFILE]]).resize(),
};
