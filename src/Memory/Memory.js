const fs = require("fs");

class Memory {
	constructor(user) {
		this.user = user;
		process.chdir(__dirname);
		this.data = JSON.parse( fs.readFileSync("./memory.json", 'utf8') );
	}
	
	isExist() { return !!this.data[this.user] }
	isEmpty() { return !!this.data }
	create() { if (!this.isExist()) this.user[this.updateValue(null)] }
	delete() {
		delete this.data[this.user];
		const updatedJsonData = JSON.stringify(this.data, null, 2);
		fs.writeFileSync("./memory.json", updatedJsonData);
	}
	updateValue(newValue) {
		this.data[this.user] = newValue;
		const updatedJsonData = JSON.stringify(this.data, null, 2);
		fs.writeFileSync("./memory.json", updatedJsonData);
	}
}

module.exports = Memory