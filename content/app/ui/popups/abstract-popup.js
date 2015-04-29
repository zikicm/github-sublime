(function (window) {

// imports
var EventDispatcher = window.ghs.content.app.events.EventDispatcher;

/**
 * Abstract popup defines popup interface and provides ui container.
 */
var AbstractPopup = Class(EventDispatcher, {

	/**
	 * AbstractPopup constructor.
	 */
	constructor : function () {
		AbstractPopup.$super.call(this);

		this.view = document.createElement('div');
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

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var ui = app.ui = app.ui || {};
var popups = ui.popups = ui.popups || {};
popups.AbstractPopup = AbstractPopup;

})(window);