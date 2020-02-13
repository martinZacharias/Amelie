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
		const source = "https://danbooru.donmai.us/posts.json?limit=1&random=true&tags=rating%3Aexplicit";
		try {
			let result;
			do {
				result = JSON.parse(await WebRequest.getBuffer(source))[0];
			} while (result.large_file_url === undefined);
			const content = new Discord.MessageEmbed()
				.setAuthor(result.tag_string_artist, "", `https://danbooru.donmai.us/posts?tags=${result.tag_string_artist}`)
				.setColor("B303E6")
				.setURL(`https://danbooru.donmai.us/posts/${result.id}`)
				.setImage(result.large_file_url)
				.setTitle(`${result.tag_string_character} | ${result.tag_string_copyright}`)
				.setFooter(
					`🧡${result.fav_count} 🔺${result.up_score}`,
					"https://cdn.discordapp.com/emojis/674594025692594193.png"
				)
				.setTimestamp(result.created_at);
			msg.channel.send(content);
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = Hentai;
