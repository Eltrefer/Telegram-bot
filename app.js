import { Telegraf } from "telegraf";
import { TOKEN } from "./TOKEN.js"
import { Message } from "./Message.js";

const bot = new Telegraf(TOKEN);
const message = new Message(bot)

message.init()

bot.launch( console.log("[Bot start]") )
