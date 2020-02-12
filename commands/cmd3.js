const Command = require("../models/command.js");

class cmd3 extends Command {
	constructor() {
		super({});
	}

	async run(msg, args) {
		this.sendMessage(msg, "this is command #3");
	}
}

module.exports = cmd3;
