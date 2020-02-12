const Discord = require("discord.js");
const config = require("../data/config.js");

/**
 * @class Command
 */
class Command {
	constructor(options) {
		const defaults = {
			ownerOnly: false,
		};
		this.options = Object.assign(defaults, options);
	}

	hasPerms(msg) {
		// todo:
		return true;
	}

	sendMessage(msg, content) {
		const embed = new Discord.MessageEmbed();
		embed.description = content;
		msg.channel.send(embed);
	}
}

module.exports = Command;
