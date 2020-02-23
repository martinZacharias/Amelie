const Command = require("../models/command.js");
const Discord = require("discord.js");
const WebRequest = require("../util/webRequest.js");

class Hentai extends Command {
	constructor() {
		super({ nsfw: true });
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		const sentMsg = await msg.channel.send(await this.createContent(msg));
		msg.channel.stopTyping();
		const filter = (reaction, user) => reaction.emoji.name === "🔀" && user.id === msg.author.id;
		const botReaction = await sentMsg.react("🔀");
		let reactions;
		do {
			reactions = await sentMsg.awaitReactions(filter, { time: 30000, max: 1 });
			if (reactions.size > 0) {
				sentMsg.edit(await this.createContent());
				reactions.first().users.remove(msg.author);
			}
		} while (reactions.size > 0);
		botReaction.remove();
	}

	async createContent() {
		const source = "https://danbooru.donmai.us/posts.json?limit=1&random=true&tags=rating%3Aexplicit";
		try {
			let result;
			do {
				result = JSON.parse(await WebRequest.getBuffer(source))[0];
			} while (result.large_file_url === undefined);
			const content = new Discord.MessageEmbed()
				.setAuthor(
					result.tag_string_artist || "no",
					"",
					`https://danbooru.donmai.us/posts?tags=${result.tag_string_artist}`
				)
				.setColor(0xb303e6) // hentai pink
				.setURL(`https://danbooru.donmai.us/posts/${result.id}`)
				.setImage(result.large_file_url)
				.setTitle(`${result.tag_string_character} | ${result.tag_string_copyright}`)
				.setFooter(
					`🧡${result.fav_count} 🔺${result.up_score}`,
					"https://cdn.discordapp.com/emojis/674594025692594193.png"
				)
				.setTimestamp(result.created_at);
			return content;
		} catch (error) {
			return new Discord.MessageEmbed()
				.setDescription("an error occured while looking for hentai \n react to try again")
				.setColor("RED");
		}
	}
}

module.exports = Hentai;
