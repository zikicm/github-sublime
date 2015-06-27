define("libs/text-selection/text-selection-control", function(require, exports, module) {

	// imports
	var Event = require("libs/events/event");
	var EventDispatcher = require("libs/events/event-dispatcher");
	var TextSelection = require("libs/text-selection/text-selection");

	/**
	 * Control for text selection on page.
	 */
	var TextSelectionControl = Class(EventDispatcher, {

		/**
		 * Helper constructor.
		 */
		constructor : function () {
			TextSelectionControl.$super.call(this);

			this._selection = new TextSelection();

			this._onMouseUpHandler = this._onMouseUp.bind(this);
			this._onMouseOutHandler = this._onMouseOut.bind(this);
			this._onKeyUpHandler = this._onKeyUp.bind(this);

			document.addEventListener("mouseup", this._onMouseUpHandler);
			document.addEventListener("mouseout", this._onMouseOutHandler);
			document.addEventListener("keyup", this._onKeyUpHandler);
		},

		/**
		 * Check if selection on page have changed.
		 * If it does trigger SELECT event.
		 */
		_checkSelection : function () {
			var nativeSelection = window.getSelection();
			var newSelection = TextSelection.createFromSelection(nativeSelection);
			if (!this._selection.equalTo(newSelection)) {
				this._selection = newSelection;
				var evt = new Event(Event.SELECT, this._selection);
				this.trigger(evt);
			}
		},

		/**
		 * Mouse up event handler.
		 * @param  {Event} evt
		 */
		_onMouseUp : function (evt) {
			this._checkSelection();
		},

		/**
		 * Mouse out event handler.
		 * @param  {Event} evt
		 */
		_onMouseOut : function (evt) {
			this._checkSelection();
		},

		/**
		 * Key up event handler.
		 * @param  {Event} evt
		 */
		_onKeyUp : function (evt) {
			if (evt.shiftKey) {
				this._checkSelection();
			}
		},

	});

	// export
	module.exports = new TextSelectionControl();

});
