(function (window) {

/**
 * Internal rpc library class, Request.
 */
var Request = Class({

	$statics : {

		/**
		 * Request id grneration counter.
		 * @type {Number}
		 */
		_genId : 1,

		/**
		 * Generate request unique id.
		 * @return {Number}
		 */
		_generateId : function () {
			return Request._genId++;
		},

		/**
		 * Create request helper.
		 * @param  {String} method
		 * @param  {Array}  args
		 * @return {Request}
		 */
		createRequest : function (method, args) {
			var req = new Request();
			req.id = Request._generateId();
			req.method = method;
			req.args = args;
			req.isNotification = false;
			return req;
		},

		/**
		 * Create notification helper.
		 * @param  {String} method
		 * @param  {Array}  args
		 * @return {Request}
		 */
		createNotification : function (method, args) {
			var req = new Request();
			req.id = Request._generateId();
			req.method = method;
			req.args = args;
			req.isNotification = true;
			return req;
		},

	},

	/**
	 * Request constructor
	 */
	constructor : function () {
		this.id = null;
		this.method = null;
		this.args = null;
		this.isNotification = false;
	},

	/**
	 * String representation for printing.
	 * @return {String}
	 */
	toString : function () {
		return 'Request {' +
			' id : ' + this.id +
			' method : ' + this.method +
			' args : ' + this.args +
			' isNotification : ' + this.isNotification +
			' }';
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
rpc.Request = Request;

})(window);