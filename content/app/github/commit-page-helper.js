define("content/app/github/commit-page-helper", function(require, exports, module) {

	// imports
	var FileElementWrapper = require("content/app/github/wrappers/file-element-wrapper");

	/**
	 * Helper for accessing and manipulating DOM of commit and pull request page.
	 */
	var CommitPageHelper = Class(Object, {

		$statics : {

			/**
			 * Get wrappers for all files DOM elements.
			 * @return {FileElementWrapper[]}
			 */
			getAllFiles : function () {
				var domElements = document.getElementsByClassName(FileElementWrapper.FILE_CLASS);

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
				for (var i = 0; i < files.length; i++) {
					if (files[i].isInViewport) {
						file = files[i];
						break;
					}
				}

				return file;
			},

		},

	});

	module.exports = CommitPageHelper;

});