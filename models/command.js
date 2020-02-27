const Discord = require("discord.js");
const config = require("../data/config.js");
const CustomError = require("./customError.js");

/**
 * @class Command
 */
class Command {
	/**
	 * @param {CommandOptions} options
	 */
	constructor(options = {}) {
		this.options = {
			ownerOnly: options.ownerOnly || false,
			dmAllowed: options.dmAllowed || true,
			guildAllowed: options.guildAllowed || true,
			nsfwOnly: options.nsfwOnly || false,
			permissions: options.permissions || 0,
		};
	}
	/**
	 * @param {Discord.Message} msg
	 */
	checkFlags(msg) {
		if (this.options.ownerOnly && !config.owner.includes(msg.author.id))
			throw new CustomError("Owner Only", "This command can only be used by the owner");
		if (this.options.nsfwOnly && !msg.channel.nsfw)
			throw new CustomError("NSFW Only", "This command can only be used in an NSFW channel");
		if (!this.options.dmOnly && msg.channel.type == "dm")
			throw new CustomError("Invalid Channel Type", "This command cannot be used in DM channels");
		if (!this.options.guildAllowed && msg.channel.type == "text")
			throw new CustomError("Invalid Channel Type", "This command cannot be used in guild channels");
		const missing = msg.member.permissions.missing(this.options.permissions);
		if (missing.length > 0) {
			let description = "You're missing:";
			for (const perm of missing) description += "\n" + perm;
			throw new CustomError("Insufficient Permissions", description);
		}
	}

	sendMessage(msg, content) {
		const embed = new Discord.MessageEmbed();
		embed.description = content;
		msg.channel.send(embed);
	}
}

module.exports = Command;

/**
 * @typedef {Object} CommandOptions
 * @property {Boolean} ownerOnly
 * @property {Boolean} dmAllowed
 * @property {Boolean} guildAllowed
 * @property {Boolean} nsfwOnly
 * @property {Discord.Permissions} permissions
 */
