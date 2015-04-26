(function (window) {

// imports
var ExtensionContentDriver = window.ghs.libs.rpc.drivers.ExtensionContentDriver;
var ObjectProtocol = window.ghs.libs.rpc.protocols.ObjectProtocol;
var Connection = window.ghs.libs.rpc.Connection;
var Commands = window.ghs.shared.Commands;

var CommandManager = window.ghs.content.app.commands.CommandManager;
var GotoLineCommand = window.ghs.content.app.commands.GotoLineCommand;

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

})(window);