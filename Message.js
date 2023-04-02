import { Markup } from "telegraf";
import { Parse } from "./Parse.js";
import { message } from "telegraf/filters"; 
import Memory from "./Memory.js";
import * as fs from "fs"

export class Message {
	constructor(bot) {
		this.bot = bot;
	}

	init() {
		const CANCEL_TEXT = 'Back 🔙';
		
		this.bot.start((msg) => msg.reply('Welcome'));
		this.bot.on(message('sticker'), (msg) => msg.reply('👍'));
		this.bot.hears("msg", (msg) => console.log((msg.from.id) ))
		
		this.bot.hears("techno360", async (msg) => {
			await Parse("https://www.techno360.in", msg.from.id).then( (result) => {
				const data = JSON.parse( fs.readFileSync("memory.json", 'utf8') );
				for (const id in data) {
					console.log( id );
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
				}
			})
		});
		
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
	}
}

// const CronJob = require('../lib/cron.js').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('0 */10 * * * *', function() {
// 	const d = new Date();
// 	console.log('Every Tenth Minute:', d);
// });
// console.log('After job instantiation');
// job.start();