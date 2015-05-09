define("content/app/commands/goto-line-command", function(require, exports, module) {

	// imports
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var Event =require("content/app/events/event");
	var PopupManager = require("content/app/ui/popup-manager");
	var GotoLinePopup = require("content/app/ui/popups/goto-line-popup");
	var AbstractCommand = require("content/app/commands/abstract-command");
	var CommitPageHelper = require("content/app/github/commit-page-helper");

	/**
	 * This command is used for navigating used in current visible file.
	 */
	var GotoLineCommand = Class(AbstractCommand, {

		/**
		 * GotoLineCommand constructor.
		 */
		constructor : function () {
			GotoLineCommand.$super.call(this);

			this._popup = null;
			this._onSubmitHandler = this._onSubmit.bind(this);
			this._onCloseHandler = this._onClose.bind(this);
		},

		/**
		 * Override. Run command.
		 */
		run : function () {
			this._popup = new GotoLinePopup();

			this._popup.on(Event.SUBMIT, this._onSubmitHandler);
			this._popup.on(Event.CLOSE, this._onCloseHandler);

			PopupManager.global().show(this._popup);
		},

		/**
		 * Override. Cancel command.
		 */
		cancel : function () {
			this._closePopup();
			this._triggerCancel();
		},

		/**
		 * Close popup.
		 */
		_closePopup : function () {
			if (this._popup) {
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
			if (isNaN(lineNumber)) {
				this._triggerCancel();
			} else {
				this._gotoLine(lineNumber);
			}
		},

		/**
		 * Close event listener on popup.
		 * @param  {Event} event
		 */
		_onClose : function (event) {
			this._closePopup();
			this._triggerCancel();
		},

		/**
		 * Navigates to closest line number in current visible file.
		 * @param  {Number} lineNumber
		 */
		_gotoLine : function (lineNumber) {
			var line = this._findLine(lineNumber);
			if (lineNumber) {
				// TODO: Scroll to this location and highlight it somehow
				alert("Goto line: " + lineNumber + " -> closest line: " + line.newNumber);
				this._triggerComplete();
			} else {
				this._triggerCancel();
			}
		},

		/**
		 * Find closest line to specified line.
		 * @param  {Number} 			lineNumber
		 * @return {LineElementWrapper}
		 */
		_findLine : function (lineNumber) {
			var line = null;

			var currentFile = CommitPageHelper.getCurrentFile();
			if (currentFile) {
				var fileData = currentFile.getFileData();
				var lines = fileData.getLines();
				// TODO: Discuss about this!
				// Currenlty this will return closest line by new line number.
				lines.sort(function (line1, line2) {
					var number1 = isNaN(line1.newNumber) ? Number.MAX_VALUE : line1.newNumber;
					var number2 = isNaN(line2.newNumber) ? Number.MAX_VALUE : line2.newNumber;
					var distance1 = Math.abs(lineNumber - number1);
					var distance2 = Math.abs(lineNumber - number2);
					return distance1 - distance2;
				});
				line = lines[0];
			}

			return line;
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