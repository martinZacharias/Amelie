const Discord = require("discord.js");
const Command = require("../../models/command");

const delay = process.env.pokefish;

class Pokefish extends Command {
	static active = false;
	static checkMatch(msg) {
		// TODO: guild has pokefish 664508672713424926
		if (this.active) return null;
		return msg.guild.id === "550777230066712611" && msg.content === ";f";
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		Pokefish.active = true;
		setTimeout(() => {
			msg.channel.send(
				`${msg.member.displayName}, ${delay} seconds have passed`
			);
			Pokefish.active = false;
		}, delay * 1000);
	}
}

module.exports = Pokefish;
