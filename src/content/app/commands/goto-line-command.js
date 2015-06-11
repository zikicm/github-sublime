define("content/app/commands/goto-line-command", function(require, exports, module) {

	// imports
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var Event =require("content/app/events/event");
	var PopupManager = require("content/app/ui/popup-manager");
	var GotoLinePopup = require("content/app/ui/popups/goto-line-popup");
	var AbstractCommand = require("content/app/commands/abstract-command");
	var CommitPageHelper = require("content/app/github/commit-page-helper");
	var WindowHelper = require("content/app/github/window-helper");

	/**
	 * This command is used for navigating used in current visible file.
	 */
	var GotoLineCommand = Class(AbstractCommand, {

		/**
		 * GotoLineCommand constructor.
		 */
		constructor : function () {
			GotoLineCommand.$super.call(this);

			this._file = null;
			this._popup = null;
			this._onSubmitHandler = this._onSubmit.bind(this);
			this._onCloseHandler = this._onClose.bind(this);
		},

		/**
		 * Override. Run command.
		 */
		run : function () {
			this._file = CommitPageHelper.getCurrentFile();
			this._showPopup();
		},

		/**
		 * Override. Cancel command.
		 */
		cancel : function () {
			this._closePopup();
			this._file = null;
			this._triggerCancel();
		},

		/**
		 * Show popup.
		 */
		_showPopup : function () {
			this._closePopup();
			this._file.isHighlighted = true;
			this._popup = new GotoLinePopup();
			this._popup.on(Event.SUBMIT, this._onSubmitHandler);
			this._popup.on(Event.CLOSE, this._onCloseHandler);
			PopupManager.global().show(this._popup);
		},

		/**
		 * Close popup.
		 */
		_closePopup : function () {
			if (this._popup) {
				this._file.isHighlighted = false;
				this._popup.off(Event.SUBMIT, this._onSubmitHandler);
				this._popup.off(Event.CLOSE, this._onCloseHandler);
				PopupManager.global().hide(this._popup);
				this._popup = null;
			}
		},

		/**
		 * Submit event listener on popup.
		 * @param  {Event} event
		 */
		_onSubmit : function (event) {
			this._closePopup();
			var lineNumber = parseInt(event.data);
			this._gotoLine(lineNumber);
		},

		/**
		 * Close event listener on popup.
		 * @param  {Event} event
		 */
		_onClose : function (event) {
			this.cancel();
		},

		/**
		 * Navigates to closest line number in current visible file.
		 * @param  {Number} lineNumber
		 */
		_gotoLine : function (lineNumber) {
			if (!isNaN(lineNumber)) {
				var line = this._findLine(lineNumber);
				if (line) {
					this._navigateToLine(line);
				}
			}
			this._triggerComplete();
		},

		/**
		 * Find closest line to specified line.
		 * @param  {Number} 			lineNumber
		 * @return {LineElementWrapper}
		 */
		_findLine : function (lineNumber) {
			var line = null;

			if (this._file) {
				var fileData = this._file.getFileData();
				var lines = fileData.getLines();
				// Find line which line contains lineNumber.
				for (var i = 0; i < lines.length; i++) {
					if (lines[i].containsLine(lineNumber)) {
						line = lines[i];
						break;
					}
				}
			}

			return line;
		},

		/**
		 * Scroll to line, highlight and focus it.
		 * @param  {LineElementWrapper} line
		 */
		_navigateToLine : function (line) {
			// Scroll to line
			var viewportBBox = WindowHelper.getViewportBoundingBox();
			var lineBBox = line.boundingBox;
			var lineCenter = lineBBox.center;
			var scrollTop = lineCenter.y - viewportBBox.height / 2;
			WindowHelper.scrollTop(scrollTop);
			// Select code in line
			line.selectCode();
		},

		/**
		 * Trigger complete event.
		 */
		_triggerComplete : function () {
			var event = new Event(Event.COMPLETE);
			this.trigger(event);
		},

		/**
		 * Trigger cancel event.
		 */
		_triggerCancel : function () {
			var event = new Event(Event.CANCEL);
			this.trigger(event);
		},

	});

	module.exports = GotoLineCommand;

});