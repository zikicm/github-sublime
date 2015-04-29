(function (window) {

// imports
var EventDispatcher = window.ghs.content.app.events.EventDispatcher;

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
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var commands = app.commands = app.commands || {};
commands.AbstractCommand = AbstractCommand;

})(window);