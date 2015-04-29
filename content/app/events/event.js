(function (window) {

// imports

/**
 * Event constructor.
 * @param {String} type
 * @param {Object} data
 */
var Event = function (type, data) {
	this.type = type;
	this.data = data;
	this.target = null;
};

/**
 * Close event type.
 * @type {String}
 */
Event.CLOSE = 'close';

/**
 * Submit event type.
 * @type {String}
 */
Event.SUBMIT = 'submit';

/**
 * Complete event type.
 * @type {String}
 */
Event.COMPLETE = 'complete';

/**
 * Cancel event type.
 * @type {String}
 */
Event.CANCEL = 'cancel';

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app ||{};
var events = app.events = app.events || {};
events.Event = Event;

})(window);