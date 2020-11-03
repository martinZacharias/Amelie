const Discord = require("discord.js");
const Command = require("../../models/command");

const delay = process.env.poketime;

class Pokemeow extends Command {
	static active = false;
	static checkMatch(msg) {
		// TODO: guild has pokemeow 664508672713424926
		if (this.active) return null;
		return msg.guild.id === "550777230066712611" && msg.content === ";p";
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		Pokemeow.active = true;
		setTimeout(() => {
			msg.channel.send(
				`${msg.member.displayName}, ${delay} seconds have passed`
			);
			Pokemeow.active = false;
		}, delay * 1000);
	}
}

module.exports = Pokemeow;
