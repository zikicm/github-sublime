define("content/app/commands/command-manager", function(require, exports, module) {

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

	module.exports = CommandManager;

});