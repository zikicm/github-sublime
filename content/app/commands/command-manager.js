(function (window) {

// imports

/**
 * CommandManager constructor.
 * This class ensures that only one command is active at the moment.
 */
var CommandManager = function () {
	this._command = null;
};

/**
 * Run specific command.
 * @param  {AbstractCommand} command
 */
CommandManager.prototype.runCommand = function (command) {
	this.cancelCommand();
	this._command = command;
	this._command.run();
};

/**
 * Cancel active command.
 */
CommandManager.prototype.cancelCommand = function () {
	if (this._command) {
		this._command.cancel();
		this._command = null;
	}
};

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var commands = app.commands = app.commands || {};
commands.CommandManager = CommandManager;

})(window);