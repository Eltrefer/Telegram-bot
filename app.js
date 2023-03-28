import { Markup, Telegraf } from "telegraf";
import { Parse } from "./Parse.js";
import { message } from "telegraf/filters"; 
import { TOKEN } from "./TOKEN.js"

const bot = new Telegraf(TOKEN);

const CANCEL_TEXT = 'Back 🔙';

bot.start((msg) => msg.reply('Welcome'));
bot.on(message('sticker'), (msg) => msg.reply('👍'));

bot.hears("techno360", async (msg) => {
	await Parse("https://www.techno360.in").then( (result) => {
		for (const key in result) {
			msg.replyWithPhoto(
				result[key].img,
				{caption: `
					<strong>${ result[key].title }</strong>
					\n${result[key].description}...
					\n<a href="${result[key].url}">⤷ Product link </a> | #Techno360`,
				parse_mode: "HTML" }
			)
		}
	})
});

bot.command("keyboard", (msg) => {
	msg.reply("here it is", Markup.keyboard(
		[ ["techno360", CANCEL_TEXT], ]
	).resize())
})


bot.launch( console.log("[Bot start]") )
