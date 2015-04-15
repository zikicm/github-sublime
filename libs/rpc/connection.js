(function (window) {

/**
 * Connection constructor
 * @param {AbstractDriver} 		driver
 */
var Connection = function (driver) {
	this._driver = driver;
	this._listeners = {};
	this._driver.onRecieve(this._onRecieve.bind(this));
};

/**
 * Async call to remote method
 * @param {String} 						method 		Method name
 * @param {[Object[,Object[,...]]]} 	arguments
 * @return {Promise}
 */
Connection.prototype.callAsync = function (method) {
	var request = {
		method : method,
		data : Array.prototype.slice(arguments, 1),
	};
	return this._driver.send(request);
};

/**
 * Call remote method without waiting for response
 * @param {String} 						method 		Method name
 * @param {[Object[,Object[,...]]]} 	arguments
 */
Connection.prototype.notify = function (method) {
	var request = {
		method : method,
		data : Array.prototype.slice(arguments, 1),
	};
	this._driver.send(request);
};

/**
 * Register listener for method call
 * @param  {String}   method
 * @param  {Function} callback
 */
Connection.prototype.on = function (method, callback) {
	this._listeners[method] = callback;
};

/**
 * Handler for request sent from remote app
 * @param  {Object} request
 * @return {Object}
 */
Connection.prototype._onRecieve = function (request) {
	var callback = this._listeners[request.method];
	if (callback) {
		return callback(request.data);
	}
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
rpc.Connection = Connection;

})(window);