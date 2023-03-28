import * as fs from "fs"

export default class Memory {
	constructor(filePath) {
		this.filePath = filePath
		this.data = JSON.parse( fs.readFileSync(this.filePath, 'utf8') );
	}
	
	update(newValue) {
		this.data.last = newValue;
		const updatedJsonData = JSON.stringify(this.data, null, 2);
		fs.writeFileSync(this.filePath, updatedJsonData);
	}
}
