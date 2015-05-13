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

			/**
			 * Get viewport bounding box relative to client visible area.
			 * That means that viewport is at position (0,0).
			 * @return {Box}
			 */
			getViewportClientBoundingBox : function () {
				var width = document.documentElement.clientWidth;
				var height = document.documentElement.clientHeight;
				return new Box(0, 0, width, height);
			},

			/**
			 * Scrolls vertically document body.
			 * @param  {Number}		scrollDelta
			 */
			scrollTop : function(value) {
				document.body.scrollTop = value;
			},


		},

	});

	module.exports = WindowHelper;

});