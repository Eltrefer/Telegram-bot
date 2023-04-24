const { Telegraf } = require("telegraf");
const init = require("./Message.js");
require("./.env")

const bot = new Telegraf(process.env.TOKEN);

init(bot)

bot.launch( console.log("[Bot start]") )
