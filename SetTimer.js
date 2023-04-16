import * as fs from "fs"
import cron from "node-cron";
import { Parse } from "./Parse.js";

export default function SetTimer(interval) {
	cron.schedule(interval, async () => {
		const data = JSON.parse( fs.readFileSync("memory.json", 'utf8') );
		const firstID = Object.keys(data)[0];
		await Parse("https://www.techno360.in", firstID).then( (result) => {
			for (const key in result) {
			for (const id in data) {
				bot.telegram.sendPhoto(
					id,
					result[key].img,
					{caption: `
						<strong>${ result[key].title }</strong>
						\n${result[key].description}...
						\n<a href="${result[key].url}">⤷ Product link </a> | #Techno360`,
					parse_mode: "HTML" }
				)
			}}
		})
		console.log("it work");
	})
}