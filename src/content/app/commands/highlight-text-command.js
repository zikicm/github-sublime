define("content/app/commands/highlight-text-command", function(require, exports, module) {

	// imports
	var Event =require("content/app/events/event");
	var AbstractCommand = require("content/app/commands/abstract-command");
	var CommitPageHelper = require("content/app/github/commit-page-helper");
	var WindowHelper = require("content/app/github/window-helper");
	var Box = require("content/app/models/box");

	/**
	 * This command is used for selecting text in files.
	 */
	var HighlightTextCommand = Class(AbstractCommand, {

		/**
		 * HighlightTextCommand constructor.
		 */
		constructor : function () {
			HighlightTextCommand.$super.call(this);

			this._onSelectHandler = this._onSelect.bind(this);
			this._highlights = [];
		},

		/**
		 * Override. Run command.
		 */
		run : function () {
			WindowHelper.on(Event.SELECT, this._onSelectHandler);
		},

		/**
		 * Override. Cancel command.
		 */
		cancel : function () {
			this._clearHightlights();
			WindowHelper.off(Event.SELECT, this._onSelectHandler);
		},

		/**
		 * Select text event handler.
		 * @param  {Event} evt
		 */
		_onSelect : function (evt) {
			this._clearHightlights();
			this._highlightText(evt.data);
		},

		/**
		 * Create highlights for provided text.
		 * @param  {String} text
		 */
		_highlightText : function (text) {
			if (text && text.length) {
				var ranges = CommitPageHelper.findTextRangesInFiles(text);
				this._highlightRanges(ranges);
			}
		},

		/**
		 * Create highlights for provided ranges and add them to page.
		 * @param  {Range[]} ranges
		 */
		_highlightRanges : function (ranges) {
			for (var i = 0; i < ranges.length; i++) {
				var range = ranges[i];
				var highlight = this._createHighlight(range);
				this._highlights.push(highlight);
				WindowHelper.appendChild(highlight);
			}
		},

		/**
		 * Create highlight DOM element for provided range.
		 * @param  {Range} 		range
		 * @return {Element}
		 */
		_createHighlight : function (range) {
			// Calculate position on page
			var clientRect = range.getBoundingClientRect();
			var clientBBox = Box.createFromClientRect(clientRect);
			var viewport = WindowHelper.getViewportBoundingBox();
			clientBBox.translate(viewport.left, viewport.top);

			// Create DOM element
			return WindowHelper.createDivElement("text-highlight", clientBBox);
		},

		/**
		 * Remove all highlights from page.
		 */
		_clearHightlights : function () {
			while (this._highlights.length > 0) {
				var highlight = this._highlights.pop();
				WindowHelper.removeChild(highlight);
			}
		},

	});

	// export
	module.exports = HighlightTextCommand;

});
