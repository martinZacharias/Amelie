const Command = require("../models/command.js");

class cmd2 extends Command {
	constructor() {
		super({});
	}

	async run(msg, args) {
		this.sendMessage(msg, "this is the second command");
	}
}

module.exports = cmd2;
