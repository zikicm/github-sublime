define("content/app/commands/goto-line-command", function(require, exports, module) {

	// imports
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var Event =require("content/app/events/event");
	var PopupManager = require("content/app/ui/popup-manager");
	var GotoLinePopup = require("content/app/ui/popups/goto-line-popup");
	var AbstractCommand = require("content/app/commands/abstract-command");

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
			alert('Submitted value: ' + event.data);
			this._triggerComplete();
		},

		/**
		 * Close event listener on popup.
		 * @param  {Event} event
		 */
		_onClose : function (event) {
			this._closePopup();
			alert('Closed');
			this._triggerCancel();
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