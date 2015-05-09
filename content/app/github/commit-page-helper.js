define("content/app/github/commit-page-helper", function(require, exports, module) {

	// imports
	var FileElementWrapper = require("content/app/github/wrappers/dom-element-wrapper");

	/**
	 * Helper for accessing and manipulating DOM of commit and pull request page.
	 */
	var CommitPageHelper = Class(Object, {

		$statics : {

			FILE_CLASS : 'file',

			/**
			 * Get wrappers for all files DOM elements.
			 * @return {Array}
			 */
			getAllFiles : function () {
				var domElements = document.getElementsByClassName(CommitPageHelper.FILE_CLASS);

				var files = [];
				for (var i = 0; i < domElements.length; i++) {
					files.push(new FileElementWrapper(domElements[i]));
				}

				return files;
			},

			/**
			 * Get wrapper for file DOM element that is in viewport.
			 * @return {FileElementWrapper}
			 */
			getCurrentFile : function () {
				var files = CommitPageHelper.getAllFiles();

				var file = null;
				for (var i = 0; i < files.length && file === null; i++) {
					if (files[i].isInViewport) {
						file = files[i];
					}
				}

				return file;
			},

		},

	});

	module.exports = CommitPageHelper;

});