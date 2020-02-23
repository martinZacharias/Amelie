const Discord = require("discord.js");
const config = require("../data/config.js");
const CustomError = require("./customError.js");

/**
 * @class Command
 */
class Command {
	constructor(options = {}) {
		this.options = {
			ownerOnly: options.ownerOnly || false,
			nsfw: options.nsfw || false
		};
	}
	/**
	 * @param {Discord.Message} msg
	 */
	checkFlags(msg) {
		if (this.options.ownerOnly && !config.owner.includes(msg.author.id))
			throw new CustomError("Owner Only", "This command can only be used by the owner");
		if (this.options.nsfw && !msg.channel.nsfw)
			throw new CustomError("NSFW Only", "This command can only be used in an NSFW channel");
	}

	sendMessage(msg, content) {
		const embed = new Discord.MessageEmbed();
		embed.description = content;
		msg.channel.send(embed);
	}
}

module.exports = Command;
