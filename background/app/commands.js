(function (window) {

// imports
var ExtensionBackgroundDriver = ghs.libs.rpc.drivers.ExtensionBackgroundDriver;
var ObjectProtocol = ghs.libs.rpc.protocols.ObjectProtocol;
var Connection = ghs.libs.rpc.Connection;

// entrypoint
var driver = new ExtensionBackgroundDriver();
var protocol = new ObjectProtocol();
var conn = new Connection(driver, protocol);

chrome.commands.onCommand.addListener(function(command) {
	conn.notify(command);
});


})(window);
