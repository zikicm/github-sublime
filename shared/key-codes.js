(function (window) {

/**
 * Key codes from key press, down and up events.
 */
var KeyCodes = {
	ENTER : 13,
	ESC : 27,
};

// export module
var ghs = window.ghs = window.ghs || {};
var shared = ghs.shared = ghs.shared || {};
shared.KeyCodes = KeyCodes;

})(window);