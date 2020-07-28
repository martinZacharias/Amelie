const Command = require("../models/command.js");
const Discord = require("discord.js");

const delay = process.env.poketime || 10;

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
				`${msg.member.displayName}, ${delay} seconds have passed`
			);
		}, delay * 1000);
	}
}

module.exports = Pokemeow;
