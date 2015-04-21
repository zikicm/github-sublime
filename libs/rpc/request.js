(function (window) {

/**
 * Request constructor
 */
var Request = function () {
	this.id = null;
	this.method = null;
	this.args = null;
	this.isNotification = false;
};

/**
 * Request id grneration counter.
 * @type {Number}
 */
Request._genId = 1;

/**
 * Generate request unique id.
 * @return {Number}
 */
Request._generateId = function () {
	return Request._genId++;
};

/**
 * Create request helper.
 * @param  {String} method
 * @param  {Array}  args
 * @return {Request}
 */
Request.createRequest = function (method, args) {
	var req = new Request();
	req.id = Request._generateId();
	req.method = method;
	req.args = args;
	req.isNotification = false;
	return req;
};

/**
 * Create notification helper.
 * @param  {String} method
 * @param  {Array}  args
 * @return {Request}
 */
Request.createNotification = function (method, args) {
	var req = new Request();
	req.id = Request._generateId();
	req.method = method;
	req.args = args;
	req.isNotification = true;
	return req;
};

// export module
var ghs = window.ghs = window.ghs || {};
var libs = ghs.libs = ghs.libs || {};
var rpc = libs.rpc = libs.rpc || {};
rpc.Request = Request;

})(window);