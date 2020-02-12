const Command = require("../models/command.js");

class cmd1 extends Command {
	constructor() {
		super({});
	}

	async run(msg, args) {
		this.sendMessage(msg, "first cmd is me");
	}
}

module.exports = cmd1;
