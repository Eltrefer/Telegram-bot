import * as fs from "fs"

export default class Memory {
	constructor(user) {
		this.user = user;
		this.data = JSON.parse( fs.readFileSync("memory.json", 'utf8') );
	}
	
	isExist() { return !!this.data[this.user] }
	isEmpty() { return !!this.data }
	create() { this.user[this.updateValue(null)] }
	updateValue(newValue) {
		this.data[this.user] = newValue;
		const updatedJsonData = JSON.stringify(this.data, null, 2);
		fs.writeFileSync("memory.json", updatedJsonData);
	}
}
