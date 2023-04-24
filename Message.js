import { Markup } from "telegraf";
import Memory from "./Memory.js";
import SetTimer from "./SetTimer.js";

export default function init(bot) {
	const CANCEL_TEXT = 'Back 🔙';
	
	bot.start((msg) => msg.reply('Welcome'));
	bot.command("keyboard", (msg) => {
		msg.reply("here it is", Markup.keyboard(
			[ ["/add", "/delete", CANCEL_TEXT], ]
		).resize())
	})
	bot.command("add", async (msg) => {
		const User = new Memory(msg.from.id)
		User.create()														
		})
	bot.command("remove", (msg) => {
		const User = new Memory(msg.from.id)
		User.delete()
	})
	SetTimer(bot, '* * */12 * * *')
}
