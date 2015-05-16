define("content/app/github/wrappers/expandable-line-element-wrapper", function(require, exports, module) {

	// imports
	var AbstractLineElementWrapper = require("content/app/github/wrappers/abstract-line-element-wrapper");

	/**
	 * Wrapper for expandable line DOM element.
	 */
	var ExpandableLineElementWrapper = Class(AbstractLineElementWrapper, {

		$statics : {

			CLASS_NAME : 'js-expandable-line',

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			ExpandableLineElementWrapper.$super.call(this, domElement);
			this._oldNumberRange = null;
			this._newNumberRange = null;
			this._proccessElement();
		},

		/**
		 * Get old code line number range.
		 * @type {Number[]}
		 */
		oldNumberRange : {
			get : function () {
				return this._oldNumberRange;
			},
			set : function (value) {
				this._oldNumberRange = value;
			},
		},

		/**
		 * Get new code line number range.
		 * @type {Number[]}
		 */
		newNumberRange : {
			get : function () {
				return this._newNumberRange;
			},
			set : function (value) {
				this._newNumberRange = value;
			},
		},

		/**
		 * Override. Check if current line contains or represents specified line.
		 * @param {Number} 		lineNumber
		 * @return {Boolean}
		 */
		containsLine : function (lineNumber) {
			return (this._newNumberRange &&
					this._newNumberRange[0] <= lineNumber &&
					this._newNumberRange[1] >= lineNumber);
		},

	});

	module.exports = ExpandableLineElementWrapper;

});