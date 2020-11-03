const fs = require("fs");
const path = require("path");

const commands = [];
const modules = process.env.modules.split(", ");

for (const module of modules) {
	const modulePath = path.join(__dirname, "..", "commands", module);
	const files = fs.readdirSync(modulePath).filter((dirent) => {
		return path.extname(dirent) === ".js";
	});
	for (const file of files) {
		const moudleFile = require(path.join(modulePath, file));
		commands.push(moudleFile);
	}
}

module.exports = commands;
