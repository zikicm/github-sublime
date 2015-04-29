(function (window) {

// imports
var KeyCodes = window.ghs.shared.constants.KeyCodes;
var Event = window.ghs.content.app.events.Event;
var EventDispatcher = window.ghs.content.app.events.EventDispatcher;
var AbstractPopup = window.ghs.content.app.ui.popups.AbstractPopup;

/**
 * Popup for getting line number from user.
 */
var GotoLinePopup = Class(AbstractPopup, {

	/**
	 * GotoLinePopup constructor.
	 */
	constructor : function () {
		GotoLinePopup.$super.call(this);

		this._input = null;
		this._onBlurHandler = this._onBlur.bind(this);
		this._onKeyUpHandler = this._onKeyUp.bind(this);

		this._init();
	},

	/**
	 * Init popup.
	 */
	_init : function () {
		// create input
		this._input = document.createElement('input');
		this._input.type = 'text';
		this._input.className = 'popup-goto-line-input';
		this.view.appendChild(this._input);
		// create label
		var label = document.createElement('div');
		label.className = 'popup-goto-line-label';
		this.view.appendChild(label);
	},

	/**
	 * Override. Method called when popup is shown.
	 */
	onShow : function () {
		this.view.addEventListener('focusout', this._onBlurHandler);
		this._input.addEventListener('keyup', this._onKeyUpHandler);
		this._input.focus();
	},

	/**
	 * Override. Method called when popup is hidden.
	 */
	onHide : function () {
		this.view.removeEventListener('focusout', this._onBlurHandler);
		this._input.removeEventListener('keyup', this._onKeyUpHandler);
	},

	/**
	 * Focusout or blur event listener.
	 * @param  {Object} event
	 */
	_onBlur : function (event) {
		this._triggerClose();
	},

	/**
	 * Keyup event listener.
	 * @param  {Object} event
	 */
	_onKeyUp : function (event) {
		switch (event.keyCode) {
			case KeyCodes.ENTER:
				this._triggerSubmit();
				break;
			case KeyCodes.ESC:
				this._triggerClose();
				break;
		}
	},

	/**
	 * Trigger close event.
	 */
	_triggerClose : function () {
		var event = new Event(Event.CLOSE);
		this.trigger(event);
	},

	/**
	 * Trigger submit event.
	 */
	_triggerSubmit : function () {
		var value = parseInt(this._input.value);
		var event = new Event(Event.SUBMIT, value);
		this.trigger(event);
	},

});

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var ui = app.ui = app.ui || {};
var popups = ui.popups = ui.popups || {};
popups.GotoLinePopup = GotoLinePopup;

})(window);