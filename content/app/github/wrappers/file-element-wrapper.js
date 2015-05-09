define("content/app/github/wrappers/page-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Wrapper for file DOM element.
	 */
	var FileElementWrapper = Class(DomElementWrapper, {

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			FileElementWrapper.$super.call(this, domElement);
		},

	});

	module.exports = FileElementWrapper;

});