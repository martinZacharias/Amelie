const Discord = require("discord.js");
const Command = require("../../models/command");

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
		const count = parseInt(args[0]);
		if (count < 1) return;
		if (count >= 100) {
			deleted = this.after(msg, count);
		} else {
			deleted = this.amount(msg, count);
		}
		deleted.then(async (coll) => {
			const sentMsg = await msg.channel.send(
				`Deleted ${coll.size - 1} messages`
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

		const filtered = targets.filter((t) => t.deletable);

		return msg.channel.bulkDelete(filtered);
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
