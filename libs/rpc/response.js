(function (window) {

/**
 * Internal rpc library class, Response.
 */
var Response = Class({

	$statics : {

		/**
		 * Create response helper.
		 * @param  {Number}  method
		 * @param  {Object}  args
		 * @return {Response}
		 */
		createResponse : function (id, data) {
			var resp = new Response();
			resp.id = id;
			resp.data = data;
			resp.isError = false;
			return resp;
		},

		/**
		 * Create error helper.
		 * @param  {Number}  method
		 * @param  {Object}  args
		 * @return {Response}
		 */
		createError : function (id, message) {
			var resp = new Response();
			resp.id = id;
			resp.data = message;
			resp.isError = true;
			return resp;
		},

	},

	/**
	 * Response constructor
	 */
	constructor : function () {
		this.id = null;
		this.data = null;
		this.isError = false;
	},

	/**
	 * String representation for printing.
	 * @return {String}
	 */
	toString : function () {
		return 'Response {' +
			' id : ' + this.id +
			' data : ' + this.data +
			' isError : ' + this.isError +
			' }';
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
rpc.Response = Response;

})(window);