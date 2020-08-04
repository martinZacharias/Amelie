const Command = require("../models/command.js");
const Discord = require("discord.js");
const customError = require("../models/customError.js");

class Delete extends Command {
	static aliases = ["delete"];
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
		if (parseInt(args[0]) >= 100) {
			deleted = this.after(msg, args[0]);
		} else {
			deleted = this.amount(msg, args[0]);
		}
		deleted.then(async (coll) => {
			const sentMsg = await msg.channel.send(
				`Deleted ${coll.size} messages`
			);
			sentMsg.delete({ timeout: 5000 });
		});
	}
	/**
	 * @param {Discord.Message} msg
	 * @param {String} id
	 */
	async after(msg, id) {
		const targets = await msg.channel.messages.fetch({
			limit: 99,
			after: id,
		});
		targets.set(id, {});
		return msg.channel.bulkDelete(targets, true);
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
