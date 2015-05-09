define("content/app/github/wrappers/file-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Wrapper for file DOM element.
	 */
	var FileElementWrapper = Class(DomElementWrapper, {

		$statics : {

			FILE_CLASS : 'file',

		},

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