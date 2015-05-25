define("content/app/github/wrappers/abstract-line-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Abstract wrapper for line DOM element.
	 */
	var AbstractLineElementWrapper = Class(DomElementWrapper, {

		$statics : {

			TAG_NAME : 'tr',
			CODE_EL_CLASS_NAME : 'blob-num',

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

		/**
		 * Selects code part of line.
		 * Selection will be the same as triple-click effect.
		 */
		selectCode : function () {
			var codeElements = this._domElement.getElementsByClassName(AbstractLineElementWrapper.CODE_EL_CLASS_NAME);

			if (codeElements && codeElements.length > 0) {

				var range = document.createRange();
				range.selectNode(codeElements[0]);

				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);

			}
		},

	});

	module.exports = AbstractLineElementWrapper;

});