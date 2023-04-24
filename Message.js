const { Markup } = require("telegraf");
const Memory = require("./Memory.js");
const SetTimer = require("./SetTimer.js");

function init(bot) {
	bot.start((msg) => {
		try {
			msg.reply("Welcome!\nUse /add command to get the latest novelties\nUse /remove to stop it\n\nUse /keyboard if buttons disappear",
				Markup.keyboard(
					[ ["/add", "/delete", 'Back 🔙'], ]
				).resize())
		}
		catch (error) { console.log(error); }
	});
	bot.command("keyboard", (msg) => {
		try {
			msg.reply("here it is", Markup.keyboard(
			[ ["/add", "/delete", 'Back 🔙'], ]
			).resize())
		} 
		catch (error) {	console.log(error); }						
	})
	bot.command("add", async (msg) => {
		try {
			const User = new Memory(msg.from.id)
			User.create()		
		} 
		catch (error) {	console.log(error); }												
	})
	bot.command("remove", (msg) => {
		try {
			const User = new Memory(msg.from.id)
			User.delete()
		}
		catch (error) { console.log(error); }
	})
	SetTimer(bot, '* * */12 * * *')
}

module.exports = init