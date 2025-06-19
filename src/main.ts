import { bot } from "@bot/index";

(async () => {
  try {
    await bot.launch();
  } catch (e) {
    console.error("Bot launch error:", e);
  }
})();
