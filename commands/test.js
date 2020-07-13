const Command = require("../models/command.js");
const Discord = require("discord.js");
const fs = require("fs");

const audios = fs.readdirSync("./data/cum/");

class Test extends Command {
	static aliases = ["test"];
	constructor() {
		super({
			// voiceOnly: true,
			dmAllowed: false,
			ownerOnly: true,
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		try {
			const t = 0;
			t.z.y;
		} catch (error) {
			// console.log(error.message);
			msg.channel.send(error.message);
		}
	}
}

module.exports = Test;
