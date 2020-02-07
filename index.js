const config = require("./data/config.js");
const msgHandler = require("./handler/msgHandler.js");
const Discord = require("discord.js");
// init stuff handler
const client = new Discord.Client();
const handler = new msgHandler(client);

client.on("message", handler.handle);
client.on("ready", () => {
	console.log(`Ready ${new Date(Date.now()).toLocaleTimeString()}`);
});
client.login(config.token);
