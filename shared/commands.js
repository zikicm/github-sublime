(function (window) {

/**
 * Commands sent from background to content script.
 * This should be in sync with commands in manifest.json.
 */
var Commands = {
	GOTO_LINE : 'goto-line',
};

// export module
var ghs = window.ghs = window.ghs || {};
var shared = ghs.shared = ghs.shared || {};
shared.Commands = Commands;

})(window);