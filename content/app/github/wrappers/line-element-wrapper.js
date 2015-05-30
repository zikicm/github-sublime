define("content/app/github/wrappers/line-element-wrapper", function(require, exports, module) {

	// imports
	var AbstractLineElementWrapper = require("content/app/github/wrappers/abstract-line-element-wrapper");

	/**
	 * Wrapper for line DOM element.
	 */
	var LineElementWrapper = Class(AbstractLineElementWrapper, {

		$statics : {

			CLASS_NAME : '',
			NUMBER_ATTR_NAME : 'data-line-number',

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			LineElementWrapper.$super.call(this, domElement);
			this._oldNumber = NaN;
			this._newNumber = NaN;
			this._proccessElement();
		},

		/**
		 * Get old code line number.
		 * @type {Number}
		 */
		oldNumber : {
			get : function () {
				return this._oldNumber;
			},
		},

		/**
		 * Get new code line number.
		 * @type {Number}
		 */
		newNumber : {
			get : function () {
				return this._newNumber;
			},
		},

		/**
		 * Override. Check if current line contains or represents specified line.
		 * @param {Number} 		lineNumber
		 * @return {Boolean}
		 */
		containsLine : function (lineNumber) {
			return (this._newNumber === lineNumber);
		},

		/**
		 * Find all ranges that contains specified text.
		 * @param {String} text
		 * @return {Range[]} 
		 */
		findTextRanges : function (text) {
			var results = [];

			var contentText = this._domElement.innerText;
			var index = contentText.indexOf(text);
			if (index !== -1) {
				// var range = document.createRange();
				// range.setStart(this._domElement, index);
				// range.setEnd(this._domElement, index + text.length);
				// results.push(range);
			}

			return results;
		},

		/**
		 * Process element content to set wrapper state.
		 */
		_proccessElement : function () {
			var children = this._domElement.children;
			this._oldNumber = this._extractLineNumber(children[0]);
			this._newNumber = this._extractLineNumber(children[1]);
		},

		/**
		 * Extract line number from DOM element.
		 * @param  {Element} domElement
		 * @return {Number}
		 */
		_extractLineNumber : function (domElement) {
			var value = NaN;

			if (domElement && domElement.attributes.hasOwnProperty(LineElementWrapper.NUMBER_ATTR_NAME)) {
				var attr = domElement.attributes[LineElementWrapper.NUMBER_ATTR_NAME];
				value = parseInt(attr.value);
			}

			return value;
		},

	});

	module.exports = LineElementWrapper;

});