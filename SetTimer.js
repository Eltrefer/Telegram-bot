const fs = require("fs");
const cron = require("node-cron");
const Parse = require("./Parse.js");

function SetTimer(bot, interval) {
	cron.schedule(interval, async () => {
		const data = JSON.parse( fs.readFileSync("memory.json", 'utf8') );
		const firstID = Object.keys(data)[0];
		await Parse("https://www.techno360.in", firstID)
		.then( (result) => {
			for (const key in result) {
			for (const id in data) {
				try {
					bot.telegram.sendPhoto(
						id,
						result[key].img,
						{caption: `
							<strong>${ result[key].title }</strong>
							\n${result[key].description}...
							\n<a href="${result[key].url}">⤷ Product link </a> | #Techno360`,
						parse_mode: "HTML" }
					)
				}
				catch (error) { console.log(error); }
			}}
		})
		.catch( (err) => { console.log(err); })
	})
}

module.exports = SetTimer