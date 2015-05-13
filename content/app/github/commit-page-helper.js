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
				return FileElementWrapper.getAllFromElement(document);
			},

			/**
			 * Get wrapper for file DOM element that is in viewport.
			 * @return {FileElementWrapper}
			 */
			getCurrentFile : function () {
				var files = CommitPageHelper.getAllFiles();

				var file = null;
				var maxArea = 0;

				for (var i = 0; i < files.length; i++) {

					var curFile = files[i];
					var visibleBBox = curFile.visibleClientBoundingBox;

					if (visibleBBox && visibleBBox.area > maxArea) {
						file = curFile;
						maxArea = visibleBBox.area;
					}

				}

				return file;
			},

		},

	});

	module.exports = CommitPageHelper;

});