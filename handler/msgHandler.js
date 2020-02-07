const config = require("../data/config.js");
const Discord = require("discord.js");
/**
 * @class Message handler
 * @property {Discord.Client} client
 */
class msgHandler {
	/**
	 * @constructor
	 * @param {Discord.Client} client
	 */
	constructor(client) {
		this.client = client;
	}
	/**
	 * @param {Discord.Message} msg
	 */
	async handle(msg) {
		const args = msg.content.split(/  */);
		if (msg.author.bot || !config.prefix.includes(args[0]) || args.length < 2) return;

		msg.react("✅");
	}
}

module.exports = msgHandler;
