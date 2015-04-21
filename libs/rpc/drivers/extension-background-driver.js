(function (window) {

/**
 * ExtensionBackgroundDriver constructor
 */
var ExtensionBackgroundDriver = function () {
	this._callback = null;
	this._port = null;
	this._outgoingMessageQueue = [];
	this._incommingMessageQueue = [];
	// Event handlers
	this._onMessageHandler = this._onMessage.bind(this);
	// Add event listeners
	chrome.tabs.onActivated.addListener(this._onActivated.bind(this));
	chrome.tabs.onUpdated.addListener(this._onUpdated.bind(this));
};

/**
 * Send message to extension content
 * @param  {Object} msg
 */
ExtensionBackgroundDriver.prototype.send = function (msg) {
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
ExtensionBackgroundDriver.prototype.onRecieve = function (callback) {
	this._callback = callback;
	// Recieve all waiting messages
	while (this._incommingMessageQueue.length > 0) {
		this._callback(this._incommingMessageQueue.unshift());
	}
};

/**
 * Handler for messages sent from extension content
 * @param  {Object} msg
 */
ExtensionBackgroundDriver.prototype._onMessage = function (msg) {
	if (this._callback) {
		this._callback(msg);
	} else {
		this._incommingMessageQueue.push(msg);
	}
};

/**
 * Handler for tab activation event
 * @param  {Object} activeInfo 	Activated tab info.
 */
ExtensionBackgroundDriver.prototype._onActivated = function (activeInfo) {
	this._disconnect();
	this._connect(activeInfo.tabId);
};

/**
 * Handler for tab updated event
 * @param  {Integer} tabId
 * @param  {Object}  changeInfo
 * @param  {Tab}     tab
 */
ExtensionBackgroundDriver.prototype._onUpdated = function (tabId, changeInfo, tab) {
	this._disconnect();
	this._connect(tabId);
};

/**
 * Connect to content script in specific tab
 * @param  {Integer} tabId 	Tab id.
 */
ExtensionBackgroundDriver.prototype._connect = function (tabId) {
	this._port = chrome.tabs.connect(tabId);
	this._port.onMessage.addListener(this._onMessageHandler);
	// Send all waiting messages
	while (this._outgoingMessageQueue.length > 0) {
		this._port.postMessage(this._outgoingMessageQueue.unshift());
	}
};

/**
 * Terminate current connection to content script
 */
ExtensionBackgroundDriver.prototype._disconnect = function () {
	if (this._port) {
		this._port.onMessage.removeListener(this._onMessageHandler);
		this._port.disconnect();
		this._port = null;
	}
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var drivers = rpc.drivers = rpc.drivers || {};
drivers.ExtensionBackgroundDriver = ExtensionBackgroundDriver;

})(window);