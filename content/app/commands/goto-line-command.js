(function (window) {

// imports
var Event = window.ghs.content.app.events.Event;
var PopupManager = window.ghs.content.app.ui.PopupManager;
var GotoLinePopup = window.ghs.content.app.ui.popups.GotoLinePopup;

/**
 * GotoLineCommand constructor.
 * TODO: should inherit AbstractCommand.
 */
var GotoLineCommand = function () {
	this._popup = null;
	this._onSubmitHandler = this._onSubmit.bind(this);
	this._onCloseHandler = this._onClose.bind(this);
};

/**
 * Override. Run command.
 */
GotoLineCommand.prototype.run = function () {
	this._popup = new GotoLinePopup();

	this._popup.on(Event.SUBMIT, this._onSubmitHandler);
	this._popup.on(Event.CLOSE, this._onCloseHandler);

	PopupManager.global().show(this._popup);
};

/**
 * Override. Cancel command.
 */
GotoLineCommand.prototype.cancel = function () {
	this._closePopup();
};

/**
 * Close popup.
 */
GotoLineCommand.prototype._closePopup = function () {
	if (this._popup) {
		this._popup.off(Event.SUBMIT, this._onSubmitHandler);
		this._popup.off(Event.CLOSE, this._onCloseHandler);

		PopupManager.global().hide(this._popup);

		this._popup = null;
	}
};

/**
 * Submit event listener on popup.
 * @param  {Event} event
 */
GotoLineCommand.prototype._onSubmit = function (event) {
	this._closePopup();
	alert('Submitted value: ' + event.data);
};

/**
 * Close event listener on popup.
 * @param  {Event} event
 */
GotoLineCommand.prototype._onClose = function (event) {
	this._closePopup();
	alert('Closed');
};

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var commands = app.commands = app.commands || {};
commands.GotoLineCommand = GotoLineCommand;

})(window);