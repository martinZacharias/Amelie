const config = require("../data/config.js");
const Discord = require("discord.js");
const { match } = require("ffmpeg-static");
/**
 * @class Message handler
 * @property {Discord.Client} client
 */
class msgHandler {
	/**
	 * @constructor
	 * @param {Discord.Client} client
	 */
	constructor(client) {
		this.client = client;
		this.commands = require("./cmdLoader.js");
	}
	/**
	 * @param {Discord.Message} msg
	 */
	async handle(msg) {
		//ignore bot messages
		if (msg.author.bot) return;
		this.checkMsgLink(msg);

		let logged = false;
		if (msg.mentions.users.has(this.client.user.id) || msg.channel.type == "dm") {
			console.log(`${msg.channel.name || "DM"}@${msg.author.username}#${msg.author.discriminator}: ${msg}`);
			logged = true;
		}

		//check if msg starts with prefix and return found prefix
		const prefix = config.prefix.find((pre) => msg.content.startsWith(pre));
		if (prefix === undefined) return;
		// fetch args from msg
		const args = msg.content
			.substring(prefix.length) // skip prefix
			.split(" ")
			.filter((arg) => arg); // remove empty args

		let cmd = args.shift();
		if (!this.commands.hasOwnProperty(cmd)) return;
		if (!logged) console.log(`${msg.channel.name}@${msg.author.username}#${msg.author.discriminator}: ${msg}`);

		cmd = new this.commands[cmd]();

		try {
			cmd.checkFlags(msg);
			await cmd.run(msg, args);
		} catch (error) {
			msg.react("❌");
			if (!error.show) throw error;
			await showError(msg, error);
		}
	}

	/**
 	* turns message links into embeds
 	* @param {Discord.Message} msg
 	*/
	async checkMsgLink(msg) {
		const messageLinkPattern = /^https?:\/\/discord(app)?\.com\/channels\/(\d{17,19})\/(\d{17,19})\/(\d{17,19})$/i;
		const matches = msg.content.match(messageLinkPattern);
		if (matches === null) return;
		try {
			const guild = new Discord.Guild(this.client, { id: matches[2] });
			const channel = await new Discord.TextChannel(guild, { id: matches[3] }).fetch();
			const qMsg = await new Discord.Message(this.client, { id: matches[4] }, channel).fetch();
			msg.delete({ reason: "replaced with embed" });

			let reactionStr = "";
			for (const [key, reaction] of qMsg.reactions.cache) {
				const emoji = reaction.emoji;
				// default emojis have no id and avaibalbe not set
				if (!emoji.id || emoji.available) {
					if (emoji.id)
						reactionStr += `<:${emoji.identifier}>`;
					else
						reactionStr += emoji.name;
				}
			}

			const embem = new Discord.MessageEmbed()
				.setColor(0x006666)
				.setDescription(`[Link to Message](${matches[0]})\n${qMsg.content}`)
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

module.exports = msgHandler;

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