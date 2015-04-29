(function (window) {

// imports

/**
 * Manager that ensures that only one command is active at the moment.
 */
var CommandManager = Class({

	/**
	 * CommandManager constructor.
	 * This class ensures that only one command is active at the moment.
	 */
	constructor : function () {
		this._command = null;
	},

	/**
	 * Run specific command.
	 * @param  {AbstractCommand} command
	 */
	runCommand : function (command) {
		this.cancelCommand();
		this._command = command;
		this._command.run();
	},

	/**
	 * Cancel active command.
	 */
	cancelCommand : function () {
		if (this._command) {
			this._command.cancel();
			this._command = null;
		}
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var commands = app.commands = app.commands || {};
commands.CommandManager = CommandManager;

})(window);