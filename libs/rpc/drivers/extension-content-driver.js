(function (window) {

/**
 * ExtensionContentDriver constructor
 */
var ExtensionContentDriver = function () {
	this._callback = null;
	this._port = null;
	this._outgoingMessageQueue = [];
	this._incommingMessageQueue = [];
	// Event handlers
	this._onDisconnectHandler = this._onDisconnect.bind(this);
	this._onMessageHandler = this._onMessage.bind(this);
	// Add event listeners
	chrome.runtime.onConnect.addListener(this._onConnect.bind(this));
};

/**
 * Send msg to extension background
 * @param  {Object}  msg
 */
ExtensionContentDriver.prototype.send = function (msg) {
	if (this._port) {
		this._port.postMessage(msg);
	} else {
		this._outgoingMessageQueue.push(msg);
	}
};

/**
 * Register listener for messages
 * @param  {Function} callback
 */
ExtensionContentDriver.prototype.onRecieve = function (callback) {
	this._callback = callback;
	// Recieve all waiting messages
	while (this._incommingMessageQueue.length > 0) {
		this._callback(this._incommingMessageQueue.unshift());
	}
};

/**
 * Handler for message sent from extension background
 * @param  {Object} msg
 */
ExtensionContentDriver.prototype._onMessage = function (msg) {
	if (this._callback) {
		response = this._callback(msg);
	} else {
		this._incommingMessageQueue.push(msg);
	}
};

/**
 * Handler for connect event
 * @param  {Port} port 	Connection port.
 */
ExtensionContentDriver.prototype._onConnect = function (port) {
	this._port = port;
	this._port.onDisconnect.addListener(this._onDisconnectHandler);
	this._port.onMessage.addListener(this._onMessageHandler);
	// Send all waiting messages
	while (this._outgoingMessageQueue.length > 0) {
		this._port.postMessage(this._outgoingMessageQueue.unshift());
	}
};

/**
 * Handler for disconnect event
 */
ExtensionContentDriver.prototype._onDisconnect = function () {
	this._port.onDisconnect.removeListener(this._onDisconnectHandler);
	this._port.onMessage.removeListener(this._onMessageHandler);
	this._port = null;
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var drivers = rpc.drivers = rpc.drivers || {};
drivers.ExtensionContentDriver = ExtensionContentDriver;

})(window);