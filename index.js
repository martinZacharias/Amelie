const config = require("./data/config.js");
const msgHandler = require("./handlers/msgHandler.js");
const Discord = require("discord.js");

// init stuff handler
const client = new Discord.Client(config.clientOptions);
const handler = new msgHandler(client);

client.on("message", msg => handler.handle(msg));
client.on("ready", () => {
	console.log(`Ready ${new Date(client.readyTimestamp).toLocaleTimeString()}`);
	if (process.argv.includes("--idle")) client.user.setStatus("idle");
	//add @mention to prefixes
	config.prefix.unshift(`<@!${client.user.id}>`);
});

client.login(config.token);

// disconnect bot before exiting on SIGINT
process.on("SIGINT", () => {
	console.log("Terminated");
	client.destroy();
	process.exit(0);
});
