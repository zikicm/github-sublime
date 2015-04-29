(function (window) {

// imports
var EventDispatcher = window.ghs.content.app.events.EventDispatcher;
var Event = window.ghs.content.app.events.Event;
var PopupManager = window.ghs.content.app.ui.PopupManager;
var GotoLinePopup = window.ghs.content.app.ui.popups.GotoLinePopup;
var AbstractCommand = window.ghs.content.app.commands.AbstractCommand;

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

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var commands = app.commands = app.commands || {};
commands.GotoLineCommand = GotoLineCommand;

})(window);