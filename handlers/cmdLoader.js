const fs = require("fs");

const commands = {};

let files = fs.readdirSync("commands");
for (const file of files) {
	const mod = require(`../commands/${file}`);
	commands[file.slice(0, -3)] = mod;
}

module.exports = commands;
