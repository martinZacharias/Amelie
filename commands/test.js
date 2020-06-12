const Command = require("../models/command.js");
const Discord = require("discord.js");
const fs = require("fs");

const audios = fs.readdirSync("./data/cum/");

class Test extends Command {
	constructor() {
		super({
			// voiceOnly: true,
			dmAllowed: false,
			ownerOnly: true
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		let index = parseInt(args[0]);
		if (isNaN(index) || index >= audios.length || index < 0)
			index = Math.floor(Math.random() * audios.length);
		const connection = await new Discord.VoiceChannel(msg.guild, {id: "703339858319376404"}).join();
		const dispatcher = connection.play("./data/cum/" + audios[index], { volume: 0.8 });

		dispatcher.on("finish", () => connection.disconnect());
		msg.reply(`playing: [${index}] ${audios[index]}`);
	}
}

module.exports = Test;
