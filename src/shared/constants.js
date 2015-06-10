define("shared/constants", function(require, exports, module) {

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
			GOTO_FILE : 'goto-file',
		},

		/**
		 * Key codes from key press, down and up events.
		 */
		KeyCodes : {
			ENTER : 13,
			ESC : 27,
		},

		DomEvents : {
			FOCUS_OUT : "focusout",
			KEY_UP : "keyup",
		}

	};

	module.exports = constants;

});