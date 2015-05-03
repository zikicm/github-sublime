(function (window) {

// imports
var ExtensionBackgroundDriver = ghs.libs.rpc.drivers.ExtensionBackgroundDriver;
var ObjectProtocol = ghs.libs.rpc.protocols.ObjectProtocol;
var Connection = ghs.libs.rpc.Connection;
var Commands = ghs.shared.constants.Commands;

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


})(window);