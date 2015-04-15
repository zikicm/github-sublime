(function (window) {

/**
 * ExtensionContentDriver constructor
 */
var ExtensionContentDriver = function () {
	this._callback = null;
	chrome.extension.onMessage.addListener(this._onRequest.bind(this));
};

/**
 * Send request to extension background
 * @param  {Object} 	request
 * @return {Promise}
 */
ExtensionContentDriver.prototype.send = function (request) {
	return new Promise(function (success, fail) {
		chrome.runtime.sendMessage(request, function(response) {
		 	success(response);
		});
	});
};

/**
 * Register listener for requests
 * @param  {Function} callback
 */
ExtensionContentDriver.prototype.onRecieve = function (callback) {
	this._callback = callback;
};

/**
 * Handler for request sent from extension background
 * @param  {Object} request
 * @param  {Object} sender
 * @param  {Object} sendResponse
 */
ExtensionContentDriver.prototype._onRequest = function (request, sender, sendResponse) {
	var response = null;
	if (this._callback) {
		response = this._callback(request);
	}
	sendResponse(response);
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var drivers = rpc.drivers = rpc.drivers || {};
drivers.ExtensionContentDriver = ExtensionContentDriver;

})(window);