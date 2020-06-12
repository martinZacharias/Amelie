const Command = require("../models/command.js");
const Discord = require("discord.js");
const fs = require("fs");

const audios = fs.readdirSync("./data/patrick/");

class Patrick extends Command {
	constructor() {
		super({
			voiceOnly: true,
			dmAllowed: false,
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		let index = parseInt(args[0]);
		if (isNaN(index) || index >= audios.length || index < 0) index = Math.floor(Math.random() * audios.length);
		const connection = await msg.member.voice.channel.join();
		const dispatcher = connection.play("./data/patrick/" + audios[index]);
		dispatcher.on("finish", () => connection.disconnect());
	}
}

module.exports = Patrick;
