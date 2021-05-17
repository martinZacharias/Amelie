const Discord = require("discord.js");

/**
 * @param {Discord.GuildMember} member
 */
async function guildMemberAddHandler(member) {
	const greets = new Map();
	for (const greet of process.env.greets.split(",")) {
		const ids = greet.split(":");
		greets.set(ids[0], ids[1]);
	}

	if (greets.has(member.guild.id)) {
		const channel = new Discord.TextChannel(member.guild, {
			id: greets.get(member.guild.id),
		});
		const embed = new Discord.MessageEmbed()
			.setAuthor(
				member.displayName,
				member.user.avatarURL({ dynamic: true })
			)
			.setColor(0x00ffff)
			.setDescription(
				`Hi ${member}, lese die Regeln und sei nett <:PatrickStar:695776647785218079>`
			);

		const msg = channel.send(embed).then((msg) => {
			msg.delete({ timeout: 1000 * 60 * 5 });
		});
	}
}

module.exports = guildMemberAddHandler;
