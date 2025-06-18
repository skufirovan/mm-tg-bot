import { bot } from "@bot/index";

(async () => {
  try {
    await bot.launch();
    console.log("Bot started successfully");
  } catch (e) {
    console.error("Bot launch error:", e);
  }
})();
