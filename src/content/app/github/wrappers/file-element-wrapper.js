define("content/app/github/wrappers/file-element-wrapper", function(require, exports, module) {

	// imports
	var WindowHelper = require("content/app/github/window-helper");
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");
	var FilePath = require("content/app/models/file-path");

	/**
	 * Wrapper for file DOM element.
	 */
	var FileElementWrapper = Class(DomElementWrapper, {

		$statics : {

			CLASS_NAME : 'file js-details-container',
			CLASS_FILE_HEADER : 'js-selectable-text',
			DATA_CLASS_NAME : 'data',

			LEFT_LINE_HASH_SEPARATOR : "L",
			RIGHT_LINE_HASH_SEPARATOR : "R",

			/**
			 * Fet all wrappers for all elements in root.
			 * @param  {Element} 				rootElement
			 * @return {FileElementWrapper[]}
			 */
			getAllFromElement : function (rootElement) {
				var domElements = rootElement.getElementsByClassName(FileElementWrapper.CLASS_NAME);

				var files = [];
				for (var i = 0; i < domElements.length; i++) {
					files.push(new FileElementWrapper(domElements[i]));
				}

				return files;
			}

		},

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			FileElementWrapper.$super.call(this, domElement);
			this._hash = null;
			this._filePath = null;
			this._dataDomElement = null;
			this._init();
		},

		/**
		 * Element hash used for navigation using window.location.hash.
		 * @type {String}
		 */
		hash : {
			get : function () {
				return this._hash;
			}
		},

		/**
		 * File name.
		 * @type {FilePath}
		 */
		filePath : {
			get : function() {
				return this._filePath;
			}
		},

		/**
		 * Find all ranges that contains specified text.
		 * @param {String} text
		 * @return {Range[]}
		 */
		findTextRanges : function (text) {
			return WindowHelper.findTextRangesInElement(this._dataDomElement, text);
		},

		/**
		 * Create hash for left line if current file.
		 * @param  {Number} number
		 * @return {String}
		 */
		createLeftLineHash : function (number) {
			return this._hash + FileElementWrapper.LEFT_LINE_HASH_SEPARATOR + number;
		},

		/**
		 * Create hash for right line in current file.
		 * @param  {Number} number
		 * @return {String}
		 */
		createRightLineHash : function (number) {
			return this._hash + FileElementWrapper.RIGHT_LINE_HASH_SEPARATOR + number;
		},

		/**
		 * Initializes object fields.
		 */
		_init : function() {

			// Get file name from file header dom
			var fileTextSpan = this._domElement.getElementsByClassName(
				FileElementWrapper.CLASS_FILE_HEADER);
			var fullStringPath = fileTextSpan[0].getAttribute("title");
			this._filePath = new FilePath( fullStringPath );

			// Get DOM name of this file for navigation using location hash.
			// We are getting previous sibling as it is the one that has name set
			// for navigation. 
			var previousSibling = this._domElement.previousElementSibling;
			this._hash = previousSibling.name;

			// Get data dom element
			var dataDomElements = this._domElement.getElementsByClassName(FileElementWrapper.DATA_CLASS_NAME);
			this._dataDomElement = dataDomElements[0];

		},

	});

	module.exports = FileElementWrapper;

});