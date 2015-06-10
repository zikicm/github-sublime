define("content/app/github/wrappers/file-element-wrapper", function(require, exports, module) {

	// imports
	var DomElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");
	var FileDataElementWrapper = require("content/app/github/wrappers/file-data-element-wrapper");
	var FilePath = require("content/app/models/file-path");

	/**
	 * Wrapper for file DOM element.
	 */
	var FileElementWrapper = Class(DomElementWrapper, {

		$statics : {

			CLASS_NAME : 'file js-details-container',
			CLASS_FILE_HEADER : 'js-selectable-text',

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
			this._filePath = null;
			this._init();
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
		 * Get file data element wrapper for current file.
		 * @return {FileDataElementWrapper}
		 */
		getFileData : function () {
			return FileDataElementWrapper.getFromElement(this._domElement);
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

		},

	});

	module.exports = FileElementWrapper;

});