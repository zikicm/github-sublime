define("content/app/github/wrappers/file-data-element-wrapper", function(require, exports, module) {

	// imports
	var WindowHelper = require("content/app/github/window-helper");
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");
	var LineElementFactory = require("content/app/github/wrappers/line-element-factory");

	/**
	 * Wrapper for file data DOM element.
	 */
	var FileDataElementWrapper = Class(DomElementWrapper, {

		$statics : {

			CLASS_NAME : 'data',

			/**
			 * Get wrapper for file data DOM element form root.
			 * @param  {Element} 					rootElement
			 * @return {FileDataElementWrapper}
			 */
			getFromElement : function (rootElement) {
				var domElements = rootElement.getElementsByClassName(FileDataElementWrapper.CLASS_NAME);

				var fileData = null;
				if (domElements.length > 0) {
					fileData = new FileDataElementWrapper(domElements[0]);
				}

				return fileData;
			},

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			FileDataElementWrapper.$super.call(this, domElement);
		},

		/**
		 * Get all lines wrappers from this data.
		 * @return {AbstractLineElementWrapper[]}
		 */
		getLines : function () {
			return LineElementFactory.getAllFromElement(this._domElement);
		},

		/**
		 * Find all ranges that contains specified text.
		 * @param {String} text
		 * @return {Range[]}
		 */
		findTextRanges : function (text) {
			return WindowHelper.findTextRangesInElement(this._domElement, text);
		},

	});

	module.exports = FileDataElementWrapper;

});