import { bot } from "@bot/index";
import appLogger from "@infrastructure/logger/appLogger";

(async () => {
  try {
    appLogger("info", "main", `Bot launch succesfully`);
    await bot.launch();
  } catch (error) {
    console.error("Bot launch error:", error);
    appLogger("error", "main", `Bot launch error: ${error}`);
  }
})();
