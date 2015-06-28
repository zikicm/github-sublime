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

			this.$view = $('<div></div>');
			this.$view.addClass( "popup-view" );
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