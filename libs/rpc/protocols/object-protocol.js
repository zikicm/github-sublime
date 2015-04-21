(function (window) {

var Request = window.ghs.libs.rpc.Request;
var Response = window.ghs.libs.rpc.Response;

/**
 * ObjectProtocol constructor
 */
var ObjectProtocol = function () {
};

/**
 * Message type request
 * @type {String}
 */
ObjectProtocol.TYPE_REQUEST = 'request';

/**
 * Message type response
 * @type {String}
 */
ObjectProtocol.TYPE_RESPONSE = 'response';

/**
 * Parse message
 * @param  {Object} msg
 * @return {Request|Response}
 */
ObjectProtocol.prototype.parse = function (msg) {
	var obj = null;

	if (msg) {
		if (msg.type === ObjectProtocol.TYPE_REQUEST) {
			obj = this._parseRequest(msg);
		}
		else if (msg.type === ObjectProtocol.TYPE_RESPONSE) {
			obj = this._parseResponse(msg);
		}
	}

	return obj;
};

/**
 * Serialize request or response
 * @param  {Request|Response} obj
 * @return {Object}
 */
ObjectProtocol.prototype.serialize = function (obj) {
	var msg = null;

	if (obj instanceof Request) {
		msg = this._serializeRequest(obj);
	}
	else if (msg instanceof Response) {
		msg = this._serializeResponse(obj);
	}

	return msg;
};

/**
 * Parse request message
 * @param  {Object} msg
 * @return {Request}
 */
ObjectProtocol.prototype._parseRequest = function (msg) {
	var req = new Request();
	req.id = msg.id;
	req.method = msg.method;
	req.args = msg.args;
	req.isNotification = msg.isNotification;
	return req;
};

/**
 * Parse response message
 * @param  {Object} msg
 * @return {Response}
 */
ObjectProtocol.prototype._parseResponse = function (msg) {
	var resp = new Response();
	resp.id = msg.id;
	resp.data = msg.data;
	resp.isError = msg.isError;
	return resp;
};

/**
 * Serialize request
 * @param  {Request} req
 * @return {Object}
 */
ObjectProtocol.prototype._serializeRequest = function (req) {
	return {
		type : ObjectProtocol.TYPE_REQUEST,
		id : req.id,
		method : req.method,
		args : req.args,
		isNotification : req.isNotification,
	};
};

/**
 * Serialize response
 * @param  {Response} resp
 * @return {Object}
 */
ObjectProtocol.prototype._serializeResponse = function (resp) {
	return {
		type : ObjectProtocol.TYPE_RESPONSE,
		id : resp.id,
		data : resp.data,
		isError : resp.isError,
	};
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var protocols = rpc.protocols = rpc.protocols || {};
protocols.ObjectProtocol = ObjectProtocol;

})(window);