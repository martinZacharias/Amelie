const Discord = require("discord.js");
const commands = require("../commands/cmdLoader");
/**
 * @param {Discord.Message} msg
 */
async function messageHandler(msg) {
	if (msg.author.bot) {
		//ignore bot messages
		return;
	}

	const foundCommand = commands.find((cmd) => cmd.checkMatch(msg));
	if (foundCommand) {
		const cmd = new foundCommand();
		try {
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

module.exports = messageHandler;

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
