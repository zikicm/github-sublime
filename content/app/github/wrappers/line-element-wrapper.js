define("content/app/github/wrappers/line-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Wrapper for line DOM element.
	 */
	var LineElementWrapper = Class(DomElementWrapper, {

		$statics : {

			TAG_NAME : 'tr',
			TAG_LINE_CLASS : '',
			TAG_EXPANDABLE_BUTTON_CLASS : 'js-expandable-line',
			NUMBER_ATTR_NAME : 'data-line-number',

			/**
			 * Populate missing line ranges.
			 * This should set ranges for expand button lines.
			 * @param  {LineElementWrapper[]} lines
			 */
			_populateMissingRanges : function (lines) {

				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];

					if (line.isExpandButton) {
						var prevOldLineNumber = 0;
						var nextOldLineNumber = Number.MAX_VALUE;
						var prevNewLineNumber = 0;
						var nextNewLineNumber = Number.MAX_VALUE;

						var prevLine = lines[i-1];
						if (prevLine) {
							prevOldLineNumber = prevLine.oldNumberRange[1];
							prevNewLineNumber = prevLine.newNumberRange[1];
						}

						var nextLine = lines[i+1];
						if (nextLine) {
							nextOldLineNumber = nextLine.oldNumberRange[0];
							nextNewLineNumber = nextLine.newNumberRange[0];
						}

						line.oldNumberRange = [prevOldLineNumber, nextOldLineNumber];
						line.newNumberRange = [prevNewLineNumber, nextNewLineNumber];
					}
				}

			},

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
					var className = domElement.className;
					if (className === LineElementWrapper.TAG_LINE_CLASS || className === LineElementWrapper.TAG_EXPANDABLE_BUTTON_CLASS) {
						lines.push(new LineElementWrapper(domElement));
					}
				}

				this._populateMissingRanges(lines);

				return lines;
			},

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			LineElementWrapper.$super.call(this, domElement);
			this._oldNumberRange = null;
			this._newNumberRange = null;
			this._isExpandButton = false;
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
		 * Check if line is expand button.
		 * @type {Boolean}
		 */
		isExpandButton : {
			get : function () {
				return this._isExpandButton;
			},
		},

		/**
		 * Check if current line contains or represents specified line.
		 * @param {Number} 		lineNumber
		 * @return {Boolean}
		 */
		containsLine : function (lineNumber) {
			return (this.newNumberRange &&
					this.newNumberRange[0] <= lineNumber &&
					this.newNumberRange[1] >= lineNumber);
		},

		/**
		 * Process element content to set wrapper state.
		 */
		_proccessElement : function () {
			var children = this._domElement.children;
			this._oldNumberRange = this._extractLineNumberRange(children[0]);
			this._newNumberRange = this._extractLineNumberRange(children[1]);
			this._isExpandButton = this._domElement.className === LineElementWrapper.TAG_EXPANDABLE_BUTTON_CLASS;
		},

		/**
		 * Extract line number range from DOM element.
		 * @param  {Element} domElement
		 * @return {Number[]}
		 */
		_extractLineNumberRange : function (domElement) {
			var range = null;

			if (domElement && domElement.attributes.hasOwnProperty(LineElementWrapper.NUMBER_ATTR_NAME)) {
				var attr = domElement.attributes[LineElementWrapper.NUMBER_ATTR_NAME];
				var value = parseInt(attr.value);
				range = [value, value];
			}

			return range;
		},

	});

	module.exports = LineElementWrapper;

});