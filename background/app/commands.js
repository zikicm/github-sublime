(function (window) {

// imports
var ExtensionBackgroundDriver = ghs.libs.rpc.drivers.ExtensionBackgroundDriver;
var Connection = ghs.libs.rpc.Connection;

// entrypoint
var driver = new ExtensionBackgroundDriver();
var conn = new Connection(driver);

chrome.commands.onCommand.addListener(function(command) {
	conn.notify(command);
});


})(window);
