(function (window) {

// imports
var ExtensionContentDriver = ghs.libs.rpc.drivers.ExtensionContentDriver;
var Connection = ghs.libs.rpc.Connection;

// entrypoint
var driver = new ExtensionContentDriver();
var conn = new Connection(driver);

// register methods
conn.on("toggle-feature-foo", function () {
	alert("Called toggle-feature-foo");
});

})(window);