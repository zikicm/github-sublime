define("content/app/github/wrappers/abstract-line-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Abstract wrapper for line DOM element.
	 */
	var AbstractLineElementWrapper = Class(DomElementWrapper, {

		$statics : {

			TAG_NAME : 'tr',

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			AbstractLineElementWrapper.$super.call(this, domElement);
		},

		/**
		 * Check if current line contains or represents specified line.
		 * @param {Number} 		lineNumber
		 * @return {Boolean}
		 */
		containsLine : function (lineNumber) {
			throw new Error("Not implemented!");
		},

	});

	module.exports = AbstractLineElementWrapper;

});