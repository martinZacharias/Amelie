const Command = require("../models/command.js");
const Discord = require("discord.js");

class Useless extends Command {
	static aliases = ["rem"];
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		setTimeout(() => {
			msg.reply("here's your reminder!");
		}, parseFloat(args[0] * 60000));
		msg.react("⏰");
	}
}

module.exports = Useless;
