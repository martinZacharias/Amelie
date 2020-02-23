const Command = require("../models/command.js");
const Discord = require("discord.js");

class Avatar extends Command {
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		// if msg has mentions use thise, else author
		const users = msg.mentions.users.size > 0 ? msg.mentions.users.values() : [msg.author];
		const alreadyPosted = [];
		for (const user of users) {
			//check duplicates
			if (alreadyPosted.includes(user)) continue;
			alreadyPosted.push(user);
			const content = new Discord.MessageEmbed()
				.setAuthor(user.username, user.avatarURL({ size: 32 }))
				.setColor("2196f3")
				.setImage(user.avatarURL({ dynamic: true, size: 1024 }));
			msg.channel.send(content);
		}
	}
}

module.exports = Avatar;
