const Command = require("../models/command.js");
const Discord = require("discord.js");
const WebRequest = require("../util/webRequest.js");

class Hentai extends Command {
	constructor() {
		super({ nsfwOnly: true });
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		if (args[0] == undefined) args[0] = "";
		const sentMsg = await msg.channel.send(await this.createContent(msg, args));
		msg.channel.stopTyping();
		const filter = (reaction, user) => reaction.emoji.name === "🔀" && user.id === msg.author.id;
		const botReaction = await sentMsg.react("🔀");
		let reactions;
		do {
			reactions = await sentMsg.awaitReactions(filter, { time: 30000, max: 1 });
			if (reactions.size > 0) {
				sentMsg.edit(await this.createContent(msg, args));
				reactions.first().users.remove(msg.author);
			}
		} while (reactions.size > 0);
		botReaction.remove();
	}

	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async createContent(msg, args) {
		const source = "https://danbooru.donmai.us/posts.json?limit=10&random=true&tags=rating%3Aexplicit%20" + args[0];
		try {
			/** @type {DanbooruPost} */
			const result = JSON.parse(await WebRequest.getBuffer(source)).find(
				img =>
					//if publicly available
					img.file_url !== undefined &&
					// if not video
					img.tag_string_meta.split(" ").filter(tag => tag.startsWith("animated")).length != 1
			);

			//remove anime names from characters
			const filteredChars = (result.tag_string_character = result.tag_string_character.replace(/_\([a-z_-]*\)/g, ""));
			//remove duplicates
			const characters = new Set(filteredChars.split(" "));

			//add chars to title
			let title = "";
			for (const char of characters) title += char + " ";
			if (title == " ") title = "Unknown Character ";
			title += `| ${result.tag_string_copyright || "Unknown Anime"}`;
			//escape underscores to prevent markdown formatting
			title = title.replace(/_/g, "\\_");

			const content = new Discord.MessageEmbed()
				.setAuthor(
					result.tag_string_artist || "Unknown artist",
					msg.author.avatarURL({ size: 32 }),
					`https://danbooru.donmai.us/posts?tags=${result.tag_string_artist}`
				)
				.setColor(0xb303e6) // hentai pink
				.setURL(`https://danbooru.donmai.us/posts/${result.id}`)
				.setTitle(title)
				.setImage(result.file_url)
				.setFooter(
					`💙${result.fav_count} 🔺${result.up_score}`,
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

/**
 * @typedef {Object} DanbooruPost
 * @property {Number} id
 * @property {Date} created_at
 * @property {Number} uploader_id
 * @property {Number} score
 * @property {String} source
 * @property {String} md5
 * @property {Date} last_comment_bumped_at
 * @property {String} rating
 * @property {Number} image_width
 * @property {Number} image_height
 * @property {String} tag_string
 * @property {Boolean} is_note_locked
 * @property {Number} fav_count
 * @property {String} file_ext
 * @property {Date} last_noted_at
 * @property {Boolean} is_rating_locked
 * @property {Number} parent_id
 * @property {Boolean} has_children
 * @property {Number} approver_id
 * @property {Number} tag_count_general
 * @property {Number} tag_count_artist
 * @property {Number} tag_count_character
 * @property {Number} tag_count_copyright
 * @property {Number} file_size
 * @property {Boolean} is_status_locked
 * @property {String} pool_string
 * @property {String} up_score
 * @property {Number} down_score
 * @property {Boolean} is_pending
 * @property {Boolean} is_flagged
 * @property {Boolean} is_deleted
 * @property {Number} tag_count
 * @property {Date} updated_at
 * @property {Boolean} is_banned
 * @property {Number} pixiv_id
 * @property {Date} last_commented_at
 * @property {Boolean} has_active_children
 * @property {Number} bit_flags
 * @property {Number} tag_count_meta
 * @property {Boolean} has_large
 * @property {Boolean} has_visible_children
 * @property {Boolean} is_favorited
 * @property {String} tag_string_general
 * @property {String} tag_string_character
 * @property {String} tag_string_copyright
 * @property {String} tag_string_artist
 * @property {String} tag_string_meta
 * @property {String} file_url
 * @property {String} large_file_url
 * @property {String} preview_file_url
 */
