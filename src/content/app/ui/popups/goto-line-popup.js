define("content/app/ui/popups/goto-line-popup", function(require, exports, module) {

	// imports
	var constants = require("shared/constants"); 
	var KeyCodes = constants.KeyCodes;
	var DomEvents = constants.DomEvents;
	var Event = require("content/app/events/event");
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var AbstractPopup = require("content/app/ui/popups/abstract-popup");

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
			this.view.addEventListener(DomEvents.FOCUS_OUT, this._onBlurHandler);
			this._input.addEventListener(DomEvents.KEY_UP, this._onKeyUpHandler);
			this._input.focus();
		},

		/**
		 * Override. Method called when popup is hidden.
		 */
		onHide : function () {
			this.view.removeEventListener(DomEvents.FOCUS_OUT, this._onBlurHandler);
			this._input.removeEventListener(DomEvents.KEY_UP, this._onKeyUpHandler);
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

	module.exports = GotoLinePopup;

});