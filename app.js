import { Telegraf } from "telegraf";
import { TOKEN } from "./TOKEN.js"
import init from "./Message.js";

const bot = new Telegraf(TOKEN);

init(bot)

bot.launch( console.log("[Bot start]") )
