const Command = require("../models/command.js");
const Discord = require("discord.js");

class Useless extends Command {
	static aliases = ["useless"];
	static used = false;
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		if (!Useless.used) {
			Useless.used = true;
			msg.reply(
				"Du hast den useless Befehl ausgeführt. Dafür kriegst du 5 Internet-Punkte!"
			);
		} else {
			msg.channel.send(
				"Der useless Befehl wurde schon ausgeführt. Das tut mir leid ☹"
			);
		}
	}
}

module.exports = Useless;
