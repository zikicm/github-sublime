define("libs/rpc/drivers/abstract-driver", function(require, exports, module) {

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

	module.exports = AbstractDriver;

});