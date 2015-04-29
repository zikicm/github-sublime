(function (window) {

/**
 * Object that keeps all project constants.
 */
var constants = {

	/**
	 * Commands sent from background to content script.
	 * This should be in sync with commands in manifest.json.
	 */
	Commands : {
		GOTO_LINE : 'goto-line',
	},

	/**
	 * Key codes from key press, down and up events.
	 */
	KeyCodes : {
		ENTER : 13,
		ESC : 27,
	},

};


// export module
var ghs = window.ghs = window.ghs || {};
var shared = ghs.shared = ghs.shared || {};
shared.constants = constants;

})(window);