define("content/app/github/wrappers/line-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Wrapper for line DOM element.
	 */
	var LineElementWrapper = Class(DomElementWrapper, {

		$statics : {

			TAG_NAME : 'tr',
			NUMBER_ATTR_NAME : 'data-line-number',

			/**
			 * Get wrappers for all DOM elements in root.
			 * @param  {Element} 			rootElement
			 * @return {LineElementWrapper}
			 */
			getAllFromElement : function (rootElement) {
				var domElements = rootElement.getElementsByTagName(LineElementWrapper.TAG_NAME);

				var lines = [];
				for (var i = 0; i < domElements.length; i++) {
					var domElement = domElements[i];
					// TODO: Consider additional filtering.
					lines.push(new LineElementWrapper(domElement));
				}

				return lines;
			},

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			LineElementWrapper.$super.call(this, domElement);
			this._oldNumber = null;
			this._newNumber = null;
			this._proccessElement();
		},

		/**
		 * Get old code line.
		 * @type {Number}
		 */
		oldNumber : {
			get : function () {
				return this._oldNumber;
			},
		},

		/**
		 * Get new code number.
		 * @type {Number}
		 */
		newNumber : {
			get : function () {
				return this._newNumber;
			},
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
			var lineNumber = null;

			if (domElement && domElement.attributes.hasOwnProperty(LineElementWrapper.NUMBER_ATTR_NAME)) {
				var attr = domElement.attributes[LineElementWrapper.NUMBER_ATTR_NAME];
				lineNumber = parseInt(attr.value);
			}

			return lineNumber;
		},

	});

	module.exports = LineElementWrapper;

});