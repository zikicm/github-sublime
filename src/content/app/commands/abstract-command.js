define("content/app/commands/abstract-command", function(require, exports, module) {

	var EventDispatcher = require("libs/events/event-dispatcher");

	/**
	 * Abstract command defines command interface.
	 */
	var AbstractCommand = Class(EventDispatcher, {

		/**
		 * AbstractCommand constructor.
		 */
		constructor : function () {
			AbstractCommand.$super.call(this);
		},

		/**
		 * Override. Run command.
		 */
		run : function () {
			throw new Error('Not implemented!');
		},

		/**
		 * Cancel command.
		 */
		cancel : function () {
			throw new Error('Not implemented!');
		},

	});

	// export module
	module.exports = AbstractCommand;

});