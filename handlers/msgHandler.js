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
		this.commands = require("./cmdLoader.js");
	}
	/**
	 * @param {Discord.Message} msg
	 */
	async handle(msg) {
		//ignore bot messages
		if (msg.author.bot) return;
		//check if msg starts with prefix and return found prefix
		const prefix = config.prefix.find((pre) => msg.content.startsWith(pre));
		if (prefix === undefined) return;
		// fetch args from msg
		const args = msg.content
			.substring(prefix.length) // skip prefix
			.split(" ")
			.filter((arg) => arg); // remove empty args

		let cmd = args.shift();
		if (!this.commands.hasOwnProperty(cmd)) return;
		cmd = new this.commands[cmd]();

		try {
			cmd.checkFlags(msg);
			await cmd.run(msg, args);
		} catch (error) {
			msg.react("❌");
			if (!error.show) throw error;
			await showError(msg, error);
		}
	}
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
