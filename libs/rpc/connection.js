(function (window) {

var Request = window.ghs.libs.rpc.Request;
var Response = window.ghs.libs.rpc.Response;

/**
 * Rpc connection.
 */
var Connection = Class({

	/**
	 * Connection constructor
	 * @param {AbstractDriver} 		driver
	 * @param {AbstractProtocol} 	protocol
	 */
	constructor : function (driver, protocol) {
		this._driver = driver;
		this._protocol = protocol;

		this._callbacks = {};
		this._promises = {};

		this._driver.onRecieve(this._onRecieve.bind(this));
	},

	/**
	 * Async call to remote method
	 * @param {String} 						method 		Method name
	 * @param {[Object[,Object[,...]]]} 	arguments
	 * @return {Promise}
	 */
	callAsync : function (method) {
		// Create request
		var request = Request.createRequest(
			method,
			Array.prototype.slice(arguments, 1)
		);

		// Make promise for request
		var promiseData = {};
		promiseData.promise = new Promise(function (resolve, reject) {
			promiseData.resolve = resolve;
			promiseData.reject = reject;
		});

		// Save promise data
		this._promises[request.id] = promiseData;

		// Send request
		this._send(request);

		// Return promise
		return promiseData.promise;
	},

	/**
	 * Call remote method without waiting for response
	 * @param {String} 						method 		Method name
	 * @param {[Object[,Object[,...]]]} 	arguments
	 */
	notify : function (method) {
		// Create notification
		var notification = Request.createNotification(
			method,
			Array.prototype.slice(arguments, 1)
		);

		// Send notification
		this._send(notification);
	},

	/**
	 * Register listener for method call
	 * @param  {String}   method
	 * @param  {Function} callback
	 */
	on : function (method, callback) {
		if (this._callbacks[method]) {
			throw new Error("Method already registered: " + method);
		}

		this._callbacks[method] = callback;
	},

	/**
	 * Send message to remote app
	 * @param  {Request|Response} obj
	 */
	_send : function (obj) {
		if (obj) {
			var msg = this._protocol.serialize(obj);
			this._driver.send(msg);
		}
	},

	/**
	 * Handler for messages sent from remote app
	 * @param  {Object} msg
	 */
	_onRecieve : function (msg) {
		var obj = this._protocol.parse(msg);

		if (obj instanceof Request) {
			this._handleRequest(obj);
		}
		else if (obj instanceof Response) {
			this._handleResponse(obj);
		}
	},

	/**
	 * Handle request from remote app
	 * @param  {Resuest} req
	 */
	_handleRequest : function (req) {
		var response = null;

		var callback = this._callbacks[req.method];
		if (callback) {
			// Handle notification
			if (req.isNotification) {
				callback.apply(null, req.args);
			}
			// Handle request
			else {
				// Call method and return response
				try {
					var result = callback.apply(null, req.args);
					response = Response.createResponse(req.id, result);
				}
				// Return back error
				catch (err) {
					response = Response.createError(req.id, err.toString());
				}
			}
		}
		// Called method does not exist
		else {
			response = Response.createError(req.id, "Method does not exist: " + req.method);
		}

		// Send response if exists
		this._send(response);
	},

	/**
	 * Handle response from remote app
	 * @param  {Response} resp
	 */
	_handleResponse : function (resp) {
		var promiseData = this._promises[resp.id];

		if (promiseData) {
			// Return error
			if (resp.isError) {
				promiseData.reject(resp.data);
			}
			// Return method result
			else {
				promiseData.resolve(resp.data);
			}
		}
		// No waiting promise
		else {
			throw Error("Missing response promise for: " + resp);
		}
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
rpc.Connection = Connection;

})(window);