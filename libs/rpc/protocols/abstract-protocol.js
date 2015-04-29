(function (window) {

var Request = window.ghs.libs.rpc.Request;
var Response = window.ghs.libs.rpc.Response;

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

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var protocols = rpc.protocols = rpc.protocols || {};
protocols.AbstractProtocol = AbstractProtocol;

})(window);