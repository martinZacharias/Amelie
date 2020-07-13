const Discord = require("discord.js");
const config = require("../data/config.js");
const CustomError = require("./customError.js");

/**
 * @class Command
 * @property {String[]} args
 */
class Command {
	static aliases = [];
	/**
	 * @param {CommandOptions} options
	 */
	constructor(options = {}) {
		this.options = {
			ownerOnly: options.ownerOnly || false,
			dmAllowed: options.dmAllowed || true,
			guildAllowed: options.guildAllowed || true,
			nsfwOnly: options.nsfwOnly || false,
			voiceOnly: options.voiceOnly || false,
			permissions: options.permissions || 0,
		};
	}

	/**
	 *  returns msg content with prefix removed or null
	 * @param {Discord.Message} msg
	 */
	static checkMatch(msg) {
		let prefix = config.prefix.find((pre) => msg.content.startsWith(pre));
		if (prefix) {
			const name = msg.content.slice(prefix.length).split(" ")[0];
			return this.aliases.includes(name);
		} else return false;
	}

	/**
	 * @param {Discord.Message} msg
	 */
	checkFlags(msg) {
		if (this.options.ownerOnly && !config.owners.includes(msg.author.id))
			throw new CustomError(
				"Owner Only",
				"This command can only be used by the owner"
			);
		if (
			this.options.nsfwOnly &&
			msg.channel.type != "dm" &&
			!msg.channel.nsfw
		)
			throw new CustomError(
				"NSFW Only",
				"This command can only be used in an NSFW channel"
			);
		if (!this.options.dmAllowed && msg.channel.type == "dm")
			throw new CustomError(
				"Invalid Channel Type",
				"This command cannot be used in DM channels"
			);
		if (!this.options.guildAllowed && msg.channel.type == "text")
			throw new CustomError(
				"Invalid Channel Type",
				"This command cannot be used in guild channels"
			);
		if (msg.channel.type != "dm") {
			const missing = msg.member.permissions.missing(
				this.options.permissions
			);
			if (missing.length > 0) {
				let description = "You're missing:";
				for (const perm of missing) description += "\n" + perm;
				throw new CustomError("Insufficient Permissions", description);
			}
			if (this.options.voiceOnly && !msg.member.voice.channel)
				throw new CustomError(
					"VoiceChannel only",
					"You need to join a voice channel first"
				);
		}
	}
}

module.exports = Command;
