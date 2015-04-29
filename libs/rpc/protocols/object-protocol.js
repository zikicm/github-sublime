(function (window) {

var AbstractProtocol = window.ghs.libs.rpc.protocols.AbstractProtocol;
var Request = window.ghs.libs.rpc.Request;
var Response = window.ghs.libs.rpc.Response;

/**
 * Protocol that uses JavaScript objects for communication.
 */
var ObjectProtocol = Class(AbstractProtocol, {

	$statics : {

		/**
		 * Message type request
		 * @type {String}
		 */
		TYPE_REQUEST : 'request',

		/**
		 * Message type response
		 * @type {String}
		 */
		TYPE_RESPONSE : 'response',

	},

	/**
	 * ObjectProtocol constructor
	 */
	constructor : function () {
		ObjectProtocol.$super.call(this);
	},

	/**
	 * Parse message
	 * @param  {Object} msg
	 * @return {Request|Response}
	 */
	parse : function (msg) {
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
	},

	/**
	 * Serialize request or response
	 * @param  {Request|Response} obj
	 * @return {Object}
	 */
	serialize : function (obj) {
		var msg = null;

		if (obj instanceof Request) {
			msg = this._serializeRequest(obj);
		}
		else if (msg instanceof Response) {
			msg = this._serializeResponse(obj);
		}

		return msg;
	},

	/**
	 * Parse request message
	 * @param  {Object} msg
	 * @return {Request}
	 */
	_parseRequest : function (msg) {
		var req = new Request();
		req.id = msg.id;
		req.method = msg.method;
		req.args = msg.args;
		req.isNotification = msg.isNotification;
		return req;
	},

	/**
	 * Parse response message
	 * @param  {Object} msg
	 * @return {Response}
	 */
	_parseResponse : function (msg) {
		var resp = new Response();
		resp.id = msg.id;
		resp.data = msg.data;
		resp.isError = msg.isError;
		return resp;
	},

	/**
	 * Serialize request
	 * @param  {Request} req
	 * @return {Object}
	 */
	_serializeRequest : function (req) {
		return {
			type : ObjectProtocol.TYPE_REQUEST,
			id : req.id,
			method : req.method,
			args : req.args,
			isNotification : req.isNotification,
		};
	},

	/**
	 * Serialize response
	 * @param  {Response} resp
	 * @return {Object}
	 */
	_serializeResponse : function (resp) {
		return {
			type : ObjectProtocol.TYPE_RESPONSE,
			id : resp.id,
			data : resp.data,
			isError : resp.isError,
		};
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
var protocols = rpc.protocols = rpc.protocols || {};
protocols.ObjectProtocol = ObjectProtocol;

})(window);