const config = require("./config.js");
const msgHandler = require("./handlers/msgHandler.js");
const Discord = require("discord.js");

// init stuff handler

const myIntents = new Discord.Intents();
myIntents.add(
	"GUILD_MESSAGES",
	"GUILD_MESSAGE_REACTIONS",
	"GUILD_MESSAGE_TYPING",
	"DIRECT_MESSAGES"
);

const client = new Discord.Client({ intents: myIntents });

const handler = new msgHandler(client);

client.on("message", (msg) => handler.handle(msg));
client.on("ready", () => {
	console.log(
		"Ready " + new Date(client.readyTimestamp).toLocaleTimeString()
	);
	config.prefix.unshift(`<@!${client.user.id}>`);
});

client.on("guildMemberAdd", async (member) => {
	if (member.guild.id !== "277853975334879232") return;
	const channel = new Discord.TextChannel(member.guild, {
		id: "710543721585705010",
	});
	const msg = channel
		.send(
			`Hi ${member}, lese die Regeln und sei nett <:PatrickStar:695776647785218079>`
		)
		.then((msg) => {
			msg.delete({ timeout: 1000 * 60 * 5 });
		});
});

client.login(process.env.token);

// disconnect bot before exiting on SIGINT
process.on("SIGINT", () => {
	console.log("Terminated");
	client.destroy();
	process.exit(0);
});
