define("content/app/github/window-helper", function(require, exports, module) {

	// imports
	var Box = require("content/app/models/box");

	/**
	 * Helper for accessing and controlling window and root page elements.
	 */
	var WindowHelper = Class(Object, {

		$statics : {

			/**
			 * Get viewport bounding box.
			 * @return {Box}
			 */
			getViewportBoundingBox : function () {
				var width = document.documentElement.clientWidth;
				var height = document.documentElement.clientHeight;
				var left = document.body.scrollLeft;
				var top = document.body.scrollTop;
				return new Box(left, top, width, height);
			},

		},

	});

	module.exports = WindowHelper;

});