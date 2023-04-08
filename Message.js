import { Markup, Telegram } from "telegraf";
import { Parse } from "./Parse.js";
import { message } from "telegraf/filters"; 
import Memory from "./Memory.js";
import * as fs from "fs"

import cron from "node-cron";

export class Message {
	constructor(bot) {
		this.bot = bot;
	}

	init() {
		const CANCEL_TEXT = 'Back 🔙';
		
		this.bot.start((msg) => msg.reply('Welcome'));
		this.bot.on(message('sticker'), (msg) => msg.reply('👍'));
		this.bot.hears("msg", (msg) => console.log((msg.from.id) ))
		
		this.bot.command("keyboard", (msg) => {
			msg.reply("here it is", Markup.keyboard(
				[ ["techno360", CANCEL_TEXT], ]
			).resize())
		})
		this.bot.command("add", (msg) => {
			const User = new Memory(msg.from.id)
			User.create()
		})
		this.bot.command("remove", (msg) => {
			const User = new Memory(msg.from.id)
			User.delete()
		})

		cron.schedule('* * */24 * * *', async () => {
			const data = JSON.parse( fs.readFileSync("memory.json", 'utf8') );
			for (const id in data) {
				await Parse("https://www.techno360.in", id).then( (result) => {
					for (const key in result) {
						this.bot.telegram.sendPhoto(
							id,
							result[key].img,
							{caption: `
								<strong>${ result[key].title }</strong>
								\n${result[key].description}...
								\n<a href="${result[key].url}">⤷ Product link </a> | #Techno360`,
							parse_mode: "HTML" }
						)
					}
				})
			}
		})
	}
}
