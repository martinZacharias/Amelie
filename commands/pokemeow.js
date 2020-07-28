const Command = require("../models/command.js");
const Discord = require("discord.js");

class Pokemeow extends Command {
	static checkMatch(msg) {
		return msg.channel.id === "631150513152589825" && msg.content === ";p";
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		setTimeout(() => {
			msg.channel.send(
				msg.member.displayName + ", 6 seconds have passed"
			);
		}, 6000);
	}
}

module.exports = Pokemeow;
