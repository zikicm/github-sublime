define("content/app/github/wrappers/line-element-wrapper", function(require, exports, module) {

	// imports
	var LineElementWrapper = require("content/app/github/wrappers/line-element-wrapper");
	var ExpandableLineElementWrapper = require("content/app/github/wrappers/expandable-line-element-wrapper");

	/**
	 * Wrapper for line DOM element.
	 */
	var LineElementFactory = Class(Object, {

		$statics : {

			TAG_NAME : 'tr',

			/**
			 * Populate expandable line ranges.
			 * @param  {AbstractLineElementWrapper[]} lines
			 */
			_populateExpandableRanges : function (lines) {

				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];

					if (line instanceof ExpandableLineElementWrapper) {
						var prevOldLineNumber = 0;
						var nextOldLineNumber = Number.MAX_VALUE;
						var prevNewLineNumber = 0;
						var nextNewLineNumber = Number.MAX_VALUE;

						var prevLine = lines[i-1];
						if (prevLine) {
							prevOldLineNumber = prevLine.oldNumber;
							prevNewLineNumber = prevLine.newNumber;
						}

						var nextLine = lines[i+1];
						if (nextLine) {
							nextOldLineNumber = nextLine.oldNumber;
							nextNewLineNumber = nextLine.newNumber;
						}

						line.oldNumberRange = [prevOldLineNumber+1, nextOldLineNumber-1];
						line.newNumberRange = [prevNewLineNumber+1, nextNewLineNumber-1];
					}
				}

			},

			/**
			 * Get wrappers for all line DOM elements in root.
			 * @param  {Element} 			rootElement
			 * @return {AbstractLineElementWrapper[]}
			 */
			getAllFromElement : function (rootElement) {
				var domElements = rootElement.getElementsByTagName(LineElementFactory.TAG_NAME);
				var lines = [];

				for (var i = 0; i < domElements.length; i++) {

					var domElement = domElements[i];
					var line = null;

					switch (domElement.className) {

						case LineElementWrapper.CLASS_NAME:
							line = new LineElementWrapper(domElement);
							break;

						case ExpandableLineElementWrapper.CLASS_NAME:
							line = new ExpandableLineElementWrapper(domElement);
							break;

					}

					if (line) {
						lines.push(line);
					}
				}

				this._populateExpandableRanges(lines);

				return lines;
			},

		},

	});

	module.exports = LineElementFactory;

});