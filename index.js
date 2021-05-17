const msgHandler = require("./handlers/msgHandler.js");
const Discord = require("discord.js");

// init stuff handler

const client = new Discord.Client({ intents: Discord.Intents.NON_PRIVILEGED });

const handler = new msgHandler(client);

client.on("message", (msg) => handler.handle(msg));
client.on("ready", () => {
	const time = new Date(client.readyTimestamp).toLocaleTimeString();
	console.log(`${client.user.tag} at ${time}`);
});

client.on("guildMemberAdd", async (member) => {
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
});

client.login(process.env.token);

// disconnect bot before exiting on signals
for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, signalHandler);
function signalHandler() {
	console.log("Terminated");
	client.destroy();
	process.exit(0);
}
