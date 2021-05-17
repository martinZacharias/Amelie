const messageHandler = require("./handlers/message");
const guildMemberAddHandler = require("./handlers/guildMemberAdd");
const Discord = require("discord.js");

// init stuff handler

const client = new Discord.Client({ intents: Discord.Intents.NON_PRIVILEGED });

client.on("message", messageHandler);
client.on("ready", () => {
	const time = new Date(client.readyTimestamp).toLocaleTimeString();
	console.log(`${client.user.tag} at ${time}`);
});

client.on("guildMemberAdd", guildMemberAddHandler);

client.login(process.env.token);

// disconnect bot before exiting on signals
for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, signalHandler);
function signalHandler() {
	console.log("Terminated");
	client.destroy();
	process.exit(0);
}
