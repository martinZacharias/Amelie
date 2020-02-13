"use strict";

const HTTP = require("http");
const HTTPS = require("https");

/**
 * @author LukenSky
 */
class WebRequest {
	/**
	 * @param {String} url
	 * @returns {Promise<Buffer>}
	 */
	static getBuffer(url) {
		const protocol = url.startsWith("https") ? HTTPS : HTTP;

		return new Promise((resolve, reject) => {
			protocol.get(url, res => {
				let data = [];

				res.on("data", chunk => {
					data.push(chunk);
				});
				res.on("end", () => {
					resolve(Buffer.concat(data));
				});
				res.on("error", e => {
					reject(e);
				});
			});
		});
	}
}

module.exports = WebRequest;
