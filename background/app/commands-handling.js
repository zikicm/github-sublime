define("background/app/commands-handling", function(require, exports, module) {

	// imports
	var ExtensionBackgroundDriver = require("libs/rpc/drivers/extension-background-driver");
	var ObjectProtocol = require("libs/rpc/protocols/object-protocol");
	var Connection = require("libs/rpc/connection");
	var Commands = require("shared/constants").Commands;

	// entrypoint
	var driver = new ExtensionBackgroundDriver();
	var protocol = new ObjectProtocol();
	var conn = new Connection(driver, protocol);

	// Commands processing

	/**
	 * Process commands and send them to proper handler.
	 * @param  {String} command
	 */
	var processCommand = function (command) {
		switch (command) {

			case Commands.GOTO_LINE:
				// Commands that should be passed to content script.
				conn.notify(command);
				break;

		}
	};

	// Add listener to extension commands
	chrome.commands.onCommand.addListener(processCommand);

});
