(function (window) {

/**
 * Rpc abstract driver. Defines driver interface.
 */
 var AbstractDriver = Class({

	/**
	 * AbstractDriver constructor
	 */
 	constructor : function () {
 	},

	/**
	 * Send message to remote node
	 * @param  {Object} msg
	 */
	send : function (msg) {
		throw new Error('Not implemented!');
	},

	/**
	 * Register listener for messages
	 * @param  {Function} callback
	 */
	onRecieve : function (callback) {
		throw new Error('Not implemented!');
	},

 });

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var drivers = rpc.drivers = rpc.drivers || {};
drivers.AbstractDriver = AbstractDriver;

})(window);