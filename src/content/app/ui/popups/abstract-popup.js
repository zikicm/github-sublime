define("content/app/ui/popups/abstract-popup", function(require, exports, module) {

	// imports
	var EventDispatcher = require("libs/events/event-dispatcher");

	/**
	 * Abstract popup defines popup interface and provides ui container.
	 */
	var AbstractPopup = Class(EventDispatcher, {

		/**
		 * AbstractPopup constructor.
		 */
		constructor : function () {
			AbstractPopup.$super.call(this);

			view = document.createElement('div');
			this._$view = $(view);
			this._$view.addClass( "popup-view" );
		},

		/**
		 * View
		 * @type {DOMElement}
		 */
		view : {
			get : function() {
				return this._$view.get(0);
			}
		},

		/**
		 * Method called when popup is shown.
		 */
		onShow : function () {
			throw new Event('Not implemented!');
		},

		/**
		 * Method called when popup is hidden.
		 */
		onHide : function () {
			throw new Event('Not implemented!');
		},

	});

	module.exports = AbstractPopup;

});