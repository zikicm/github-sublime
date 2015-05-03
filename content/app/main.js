define("content/app/main", function(require, exports, module) {

	// imports
	var ExtensionContentDriver = require("libs/rpc/drivers/extension-content-driver");
	var ObjectProtocol = require("libs/rpc/protocols/object-protocol");
	var Connection = require("libs/rpc/connection");
	var Commands = require("shared/constants").Commands;

	var CommandManager = require("content/app/commands/command-manager");
	var GotoLineCommand = require("content/app/commands/goto-line-command");

	// entrypoint
	var driver = new ExtensionContentDriver();
	var protocol = new ObjectProtocol();
	var conn = new Connection(driver, protocol);

	var commandManager = new CommandManager();

	// register methods
	conn.on(Commands.GOTO_LINE, function () {
		var command = new GotoLineCommand();
		commandManager.runCommand(command);
	});

});