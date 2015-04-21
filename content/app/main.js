(function (window) {

// imports
var ExtensionContentDriver = ghs.libs.rpc.drivers.ExtensionContentDriver;
var ObjectProtocol = ghs.libs.rpc.protocols.ObjectProtocol;
var Connection = ghs.libs.rpc.Connection;

// entrypoint
var driver = new ExtensionContentDriver();
var protocol = new ObjectProtocol();
var conn = new Connection(driver, protocol);

// register methods
conn.on("toggle-feature-foo", function () {
	alert("Called toggle-feature-foo");
});

})(window);