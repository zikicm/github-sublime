define("content/app/github/commit-page-helper", function(require, exports, module) {

	// imports
	var WindowHelper = require("content/app/github/window-helper");
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
			 * NOTE: Consider different visible file to be selected.
			 * @return {FileElementWrapper}
			 */
			getCurrentFile : function () {
				var files = CommitPageHelper.getAllFiles();
				var viewport = WindowHelper.getViewportClientBoundingBox();
				var viewportCenter = viewport.center;

				var file = null;
				var minDistance = Number.MAX_VALUE;

				for (var i = 0; i < files.length; i++) {

					var curFile = files[i];
					var distance = curFile.clientBoundingBox.distanceToPoint(viewportCenter);

					if (distance < minDistance) {
						file = curFile;
						minDistance = distance;
					}

				}

				return file;
			},

			/**
			 * Find ranges of provided text in all file DOM elements.
			 * @param  {String} text
			 * @return {Range}
			 */
			findTextRangesInFiles : function (text) {
				var files = CommitPageHelper.getAllFiles();
				var ranges = [];
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var data = file.getFileData();
					var fileRanges = data.findTextRanges(text);
					ranges = ranges.concat(fileRanges);
				}
				return ranges;
			},

		},

	});

	// export
	module.exports = CommitPageHelper;

});
