(function (window) {

// imports
var KeyCodes = window.ghs.shared.constants.KeyCodes;
var Event = window.ghs.content.app.events.Event;
var EventDispatcher = window.ghs.content.app.events.EventDispatcher;

/**
 * GotoLinePopup constructor.
 */
var GotoLinePopup = function () {
	this.view = null;
	this._input = null;
	this._onBlurHandler = this._onBlur.bind(this);
	this._onKeyUpHandler = this._onKeyUp.bind(this);

	this._init();
};

// Temporary inheritence
// TODO: change when proper class library is introduced in project
GotoLinePopup.prototype = new EventDispatcher();

/**
 * Init popup.
 */
GotoLinePopup.prototype._init = function () {
	this.view = document.createElement('div');
	this._input = document.createElement('input');
	this._input.type = "text";
	this.view.appendChild(this._input);
};

/**
 * Override. Method called when popup is shown.
 */
GotoLinePopup.prototype.onShow = function () {
	this.view.addEventListener('focusout', this._onBlurHandler);
	this._input.addEventListener('keyup', this._onKeyUpHandler);
	this._input.focus();
};

/**
 * Override. Method called when popup is hidden.
 */
GotoLinePopup.prototype.onHide = function () {
	this.view.removeEventListener('focusout', this._onBlurHandler);
	this._input.removeEventListener('keyup', this._onKeyUpHandler);
};

/**
 * Focusout or blur event listener.
 * @param  {Object} event
 */
GotoLinePopup.prototype._onBlur = function (event) {
	this._triggerClose();
};

/**
 * Keyup event listener.
 * @param  {Object} event
 */
GotoLinePopup.prototype._onKeyUp = function (event) {
	switch (event.keyCode) {
		case KeyCodes.ENTER:
			this._triggerSubmit();
			break;
		case KeyCodes.ESC:
			this._triggerClose();
			break;
	}
};

/**
 * Trigger close event.
 */
GotoLinePopup.prototype._triggerClose = function () {
	var event = new Event(Event.CLOSE);
	this.trigger(event);
};

/**
 * Trigger submit event.
 */
GotoLinePopup.prototype._triggerSubmit = function () {
	var value = parseInt(this._input.value);
	var event = new Event(Event.SUBMIT, value);
	this.trigger(event);
};

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var ui = app.ui = app.ui || {};
var popups = ui.popups = ui.popups || {};
popups.GotoLinePopup = GotoLinePopup;

})(window);