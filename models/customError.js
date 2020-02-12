class CustomError extends Error {
	constructor(name, message, show = true) {
		super(message);
		this.name = name;
		this.show = show;
	}
}

module.exports = CustomError;
