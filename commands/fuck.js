const Command = require("../models/command.js");
const Discord = require("discord.js");
const CustomError = require("../models/customError.js");
const gifs = require("../data/fuckPics");

class Fuck extends Command {
	constructor() {
		super({ nsfwOnly: true });
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		if (msg.mentions.users.size == 0)
			throw new CustomError("Arguments Required", "You need to tell me who you want to fuck!");

		const targets = new Set(msg.mentions.users.values());
		let targetString = "";
		for (const target of targets) {
			targetString += `<@${target.id}> `;
		}
		targetString = targetString.trimRight();

		const gif = gifs[Math.floor(Math.random() * gifs.length)];
		const embed = new Discord.MessageEmbed()
			.setDescription(`${msg.author} fucks ${targetString}. They're having hot sex!`)
			.setAuthor(msg.author.username, msg.author.avatarURL())
			.setImage(gif)
			.setColor(0x00ff00)
			.setFooter(
				"message martin#0001 to add/remove pics",
				"https://cdn.discordapp.com/avatars/182938448687005696/a_c2375ec38792374b0a8d93408f6ca1ea.gif"
			);
		msg.channel.send(embed);
	}
}

module.exports = Fuck;
