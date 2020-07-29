const Command = require("../models/command.js");
const Discord = require("discord.js");

const delay = process.env.poketime || 10;

class Pokemeow extends Command {
	static checkMatch(msg) {
		return msg.guild.id === "550777230066712611" && msg.content === ";p";
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
