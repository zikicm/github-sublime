define("content/app/github/window-helper", function(require, exports, module) {

	// imports
	var Event = require("content/app/events/event");
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var Box = require("content/app/models/box");
	var Traversing = require("content/app/algo/three/traversing");
	var FindTextRangesVisitor = require("content/app/algo/three/fint-text-ranges-visitor");

	/**
	 * Helper for accessing and controlling window and root page elements.
	 */
	var WindowHelper = Class(EventDispatcher, {

		$statics : {

			INTERVAL_TICK : 100,	// ms

		},

		/**
		 * Helper constructor.
		 */
		constructor : function () {
			WindowHelper.$super.call(this);

			this._selectedText = '';
			this._intervalRef = setInterval(
				this._onIntervalTick.bind(this),
				WindowHelper.INTERVAL_TICK
			);
		},

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

		/**
		 * Check if selected text have changed.
		 * If it does trigger SELECT event.
		 */
		_checkSelectedText : function () {
			var selection = window.getSelection();
			var newSelectedText = selection.toString();
			if (this._selectedText !== newSelectedText) {
				this._selectedText = newSelectedText;
				var evt = new Event(Event.SELECT, this._selectedText);
				this.trigger(evt);
			}
		},

		/**
		 * Trigger specific actions periodically.
		 */
		_onIntervalTick : function () {
			this._checkSelectedText();
		},

	});

	// export
	module.exports = new WindowHelper();

});
