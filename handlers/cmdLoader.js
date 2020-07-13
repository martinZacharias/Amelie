const fs = require("fs");

const commands = [];

let files = fs.readdirSync("commands");
for (const file of files) {
	const mod = require(`../commands/${file}`);
	commands.push(mod);
}

module.exports = commands;
