const Discord = require("discord.js");
const Command = require("../../models/command");

class Avatar extends Command {
	static aliases = ["avatar", "pfp"];

	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		// if msg has mentions use those and remove duplicates, else author
		const users =
			msg.mentions.users.size > 0
				? new Set(msg.mentions.users.values())
				: [msg.author];
		for (const user of users) {
			const content = new Discord.MessageEmbed()
				.setAuthor(user.username, user.avatarURL({ size: 32 }))
				.setColor(0x2196f3)
				.setImage(user.avatarURL({ dynamic: true, size: 1024 }));
			if (users.size === 1) msg.reply(content);
			else msg.channel.send(content);
		}
	}
}

module.exports = Avatar;
