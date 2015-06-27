define("content/app/github/window-helper", function(require, exports, module) {

	// imports
	var Event = require("libs/events/event");
	var EventDispatcher = require("libs/events/event-dispatcher");
	var Box = require("content/app/models/box");
	var Traversing = require("content/app/algo/three/traversing");
	var FindTextRangesVisitor = require("content/app/algo/three/fint-text-ranges-visitor");

	/**
	 * Helper for accessing and controlling window and root page elements.
	 */
	var WindowHelper = Class(EventDispatcher, {

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

			/**
			 * Append DOM element to page.
			 * @param  {Element} child
			 */
			appendChild : function (child) {
				document.body.appendChild(child);
			},

			/**
			 * Remove DOM element from page.
			 * @param  {Element} child
			 */
			removeChild : function (child) {
				document.body.removeChild(child);
			},

			/**
			 * Find ranges of provided text in page.
			 * @param  {String} 	text
			 * @return {Range[]}
			 */
			findTextRanges : function (text) {
				return WindowHelper.findTextRangesInElement(document.body, text);
			},

			/**
			 * Find ranges of provided text in DOM element.
			 * @param  {Element} 	root
			 * @param  {String} 	text
			 * @return {Range[]}
			 */
			findTextRangesInElement : function (root, text) {
				var traversing = new Traversing(root);
				var visitor = new FindTextRangesVisitor(text);
				traversing.traverse(visitor);
				return visitor.ranges;
			},

		},

	});

	// export
	module.exports = WindowHelper;

});
