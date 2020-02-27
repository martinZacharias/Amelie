const Command = require("../models/command.js");
const Discord = require("discord.js");
const customError = require("../models/customError.js");

class Delete extends Command {
	constructor() {
		super({
			permissions: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
			dmAllowed: false,
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {Array<String>} args
	 */
	async run(msg, args) {
		let deleted;
		switch (args[0]) {
			case "after":
				deleted = this.after(msg, args[1]);
				break;
			default:
				deleted = this.amount(msg, args[0]);
				break;
		}
		deleted.then(async coll => {
			const sentMsg = await msg.channel.send(`Deleted ${coll.size} messages`);
			sentMsg.delete(5000);
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {String} id
	 */
	async after(msg, id) {
		return msg.channel.bulkDelete(await msg.channel.messages.fetch({ limit: 100, after: id }));
	}

	/**
	 * @param {Discord.Message} msg
	 * @param {String} count
	 */
	async amount(msg, count) {
		count = parseInt(count);
		return msg.channel.bulkDelete(count + 1);
	}
}

module.exports = Delete;
