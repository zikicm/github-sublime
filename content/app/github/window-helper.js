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

			INTERVAL_TICK : 300,	// ms

		},

		/**
		 * Helper constructor.
		 */
		constructor : function () {
			WindowHelper.$super.call(this);

			this._intervalRef = setInterval(
				this._onIntervalTick.bind(this),
				WindowHelper.INTERVAL_TICK
			);
			this._selectedText = '';
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

		appendChild : function (child) {
			document.body.appendChild(child);
		},

		removeChild : function (child) {
			document.body.removeChild(child);
		},

		findTextRanges : function (text) {
			return WindowHelper.findTextRangesInElement(document.body, text);
		},

		findTextRangesInElement : function (root, text) {
			var traversing = new Traversing(root);
			var visitor = new FindTextRangesVisitor(text);
			traversing.traverse(visitor);
			return visitor.ranges;
		},

		_checkSelectedText : function () {
			var selection = window.getSelection();
			var newSelectedText = selection.toString();
			if (this._selectedText !== newSelectedText) {
				this._selectedText = newSelectedText;
				var evt = new Event(Event.SELECT, this._selectedText);
				this.trigger(evt);
			}
		},

		_onIntervalTick : function () {
			this._checkSelectedText();
		},

	});

	module.exports = new WindowHelper();

});