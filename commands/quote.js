const Command = require("../models/command.js");
const Discord = require("discord.js");

const messageLinkPattern = /^https?:\/\/discord(app)?\.com\/channels\/(\d{17,19})\/(\d{17,19})\/(\d{17,19})$/i;

class Quote extends Command {
	static checkMatch(msg) {
		const matches = msg.content.match(messageLinkPattern);
		if (matches === null) return false;
		else return true;
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		const matches = msg.content.match(messageLinkPattern);
		try {
			const guild = new Discord.Guild(msg.client, { id: matches[2] });
			const channel = await new Discord.TextChannel(guild, {
				id: matches[3],
			}).fetch();
			const qMsg = await new Discord.Message(
				msg.client,
				{ id: matches[4] },
				channel
			).fetch();
			msg.delete({ reason: "replaced with embed" });

			let reactionStr = "";
			for (const [key, reaction] of qMsg.reactions.cache) {
				const emoji = reaction.emoji;
				// default emojis have no id and avaibalbe not set
				if (!emoji.id || emoji.available) {
					if (emoji.id) reactionStr += `<:${emoji.identifier}>`;
					else reactionStr += emoji.name;
				}
			}

			const embem = new Discord.MessageEmbed()
				.setColor(0x006666)
				.setDescription(
					`[Link to Message](${matches[0]})\n${qMsg.content}`
				)
				.setAuthor(qMsg.author.username, qMsg.author.avatarURL())
				.setFooter(qMsg.channel.name)
				.setTimestamp(qMsg.createdTimestamp);

			if (reactionStr.length > 0)
				embem.addField("Reactions", reactionStr);

			msg.channel.send(embem);
		} catch (error) {
			msg.react("❓");
		}
	}
}

module.exports = Quote;
