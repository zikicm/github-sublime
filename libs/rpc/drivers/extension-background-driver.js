(function (window) {

/**
 * ExtensionBackgroundDriver constructor
 */
var ExtensionBackgroundDriver = function () {
	this._callback = null;

	// TODO: make implementation for recieving requests from content
	// chrome.extension.onRequest.addListener(this._onRequest.bind(this));
};

/**
 * Send request to extension content
 * @param  {Object} 	request
 * @return {Promise}
 */
ExtensionBackgroundDriver.prototype.send = function (request) {
	return new Promise(function (success, fail) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
				success(response.farewell);
			});
		});
	});
};

/**
 * Register listener for requests
 * @param  {Function} callback
 */
ExtensionBackgroundDriver.prototype.onRecieve = function (callback) {
	this._callback = callback;
};

/**
 * Handler for request sent from extension content
 * @param  {Object} request
 * @param  {Object} sender
 * @param  {Object} sendResponse
 */
ExtensionBackgroundDriver.prototype._onRequest = function (request, sender, sendResponse) {
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
drivers.ExtensionBackgroundDriver = ExtensionBackgroundDriver;

})(window);