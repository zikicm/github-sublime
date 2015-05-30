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

		_onSelect : function (evt) {
			this._clearHightlights();
			var text = evt.data;
			if (text && text.length) {
				var ranges = CommitPageHelper.findTextRangesInFiles(text);
				this._createHighlights(ranges);
			}
		},

		_createHighlights : function (ranges) {
			for (var i = 0; i < ranges.length; i++) {
				var range = ranges[i];
				var highlight = this._createHighlight(range);
				this._highlights.push(highlight);
				WindowHelper.appendChild(highlight);
			}
		},

		_createHighlight : function (range) {
			var clientRect = range.getBoundingClientRect();
			var clientBBox = Box.createFromClientRect(clientRect);
			var viewport = WindowHelper.getViewportBoundingBox();
			clientBBox.translate(viewport.left, viewport.top);

			var highlight = document.createElement("div");
			highlight.style.position = "absolute";
			highlight.style.left = clientBBox.left + "px";
			highlight.style.top = clientBBox.top + "px";
			highlight.style.width = clientBBox.width + "px";
			highlight.style.height = clientBBox.height + "px";
			highlight.style.border = "1px solid red";
			return highlight;
		},

		_clearHightlights : function () {
			while (this._highlights.length > 0) {
				var highlight = this._highlights.pop();
				WindowHelper.removeChild(highlight);
			}
		},

	});

	module.exports = HighlightTextCommand;

});