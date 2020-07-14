const config = require("../config.js");
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
		this.commands = require("./cmdLoader.js");
	}
	/**
	 * @param {Discord.Message} msg
	 */
	async handle(msg) {
		if (msg.author.bot) {
			//ignore bot messages
			return;
		}

		const foundCommand = this.commands.find((cmd) => cmd.checkMatch(msg));
		if (foundCommand) {
			const cmd = new foundCommand();
			try {
				console.log(
					`${msg.channel.name}@${msg.author.username}: ${msg}`
				);
				cmd.checkFlags(msg);
				//split args
				const args = msg.content
					.split(" ")
					.slice(1) // skip prefix
					.filter((arg) => arg); // remove empty arg
				await cmd.run(msg, args);
			} catch (error) {
				msg.react("❌");
				if (!error.show) throw error;
				await showError(msg, error);
			}
		}
	}

	/**
	 * turns message links into embeds
	 * @param {Discord.Message} msg
	 */
}

module.exports = msgHandler;

/**
 * Error messaging
 * @param {Discord.Message} msg
 * @param {Error} error
 */
async function showError(msg, error) {
	await msg.channel.send(
		new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(error.name)
			.setDescription(error.message)
			.setFooter("This is an error. You did something wrong.")
	);
}
