define("libs/rpc/protocols/abstract-protocol", function(require, exports, module) {

	var Request = require("libs/rpc/request");
	var Response = require("libs/rpc/response");

	/**
	 * Rpc abstract protocol. Defines protocol interface.
	 */
	var AbstractProtocol = Class({

		/**
		 * AbstractProtocol constructor.
		 */
		constructor : function () {
		},

		/**
		 * Parse message
		 * @param  {Object} msg
		 * @return {Request|Response}
		 */
		parse : function (msg) {
			throw new Error("Not implemented!");
		},

		/**
		 * Serialize request or response
		 * @param  {Request|Response} obj
		 * @return {Object}
		 */
		serialize : function (obj) {
			throw new Error("Not implemented!");
		},

	});

	module.exports = AbstractProtocol;

});