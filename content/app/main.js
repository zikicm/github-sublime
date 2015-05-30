define("content/app/main", function(require, exports, module) {

	// imports
	var ExtensionContentDriver = require("libs/rpc/drivers/extension-content-driver");
	var ObjectProtocol = require("libs/rpc/protocols/object-protocol");
	var Connection = require("libs/rpc/connection");
	var Commands = require("shared/constants").Commands;

	var Event = require("content/app/events/event");
	var CommandManager = require("content/app/commands/command-manager");
	var GotoLineCommand = require("content/app/commands/goto-line-command");
	var GotoFileCommand = require("content/app/commands/goto-file-command");
	var HighlightTextCommand = require("content/app/commands/highlight-text-command");

	// Entrypoint
	var commandManager = new CommandManager();

	// Connection to background process
	var driver = new ExtensionContentDriver();
	var protocol = new ObjectProtocol();
	var conn = new Connection(driver, protocol);

	// Register methods

	// Goto line command
	conn.on(Commands.GOTO_LINE, function () {
		var command = new GotoLineCommand();
		commandManager.runCommand(command);
	});

	// Goto file command
	conn.on(Commands.GOTO_FILE, function () {
		var command = new GotoFileCommand();
		commandManager.runCommand(command);
	});

	// Listen for command triggers in content

	var _highlightTextCommand = new HighlightTextCommand();
	_highlightTextCommand.run();

});