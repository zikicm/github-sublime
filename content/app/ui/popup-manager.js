(function (window) {

// imports

/**
 * PopupManager constructor.
 * @param {DOMElement} container
 */
var PopupManager = function (container) {
	this._container = container;
	this._popup = null;
};

/**
 * Reference to PopupManager that uses body for content.
 * @type {PopupManager}
 */
PopupManager._global = null;

/**
 * Get reference to PopupManager that uses body for content.
 * @return {PopupManager}
 */
PopupManager.global = function () {
	if (!PopupManager._global) {
		PopupManager._global = new PopupManager(window.document.body);
	}
	return PopupManager._global;
};

/**
 * Show popup.
 * @param  {AbstractPopup} popup
 */
PopupManager.prototype.show = function (popup) {
	this.hide();

	var root = document.createElement("div");
	root.className = "popup-root";
	this._container.appendChild(root);

	var vertical = document.createElement("div");
	vertical.className = "popup-vertical-position";
	root.appendChild(vertical);

	var horizontal = document.createElement("div");
	horizontal.className = "popup-horizontal-position";
	vertical.appendChild(horizontal);

	horizontal.appendChild(popup.view);

	this._popup = {
		rootView : root,
		popup : popup,
	};

	popup.onShow();
};

/**
 * Hide popup. If popup is not specified hide active popup.
 * @param  {AbstractPopup} popup
 */
PopupManager.prototype.hide = function (popup) {
	if (this._popup && (!popup || this._popup.popup === popup)) {
		this._popup.popup.onHide();
		this._container.removeChild(this._popup.rootView);
		this._popup = null;
	}
};

// export module
var ghs = window.ghs = window.ghs || {};
var content = ghs.content = ghs.content || {};
var app = content.app = content.app || {};
var ui = app.ui = app.ui || {};
ui.PopupManager = PopupManager;

})(window);