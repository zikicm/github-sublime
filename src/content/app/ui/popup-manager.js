define("content/app/ui/popup-manager", function(require, exports, module) {

	/**
	 * Manager that enables popup showing and hiding.
	 */
	var PopupManager = Class({

		$statics : {

			/**
			 * Reference to PopupManager that uses body for content.
			 * @type {PopupManager}
			 */
			_global : null,

			/**
			 * Get reference to PopupManager that uses body for content.
			 * @return {PopupManager}
			 */
			global : function () {
				if (!PopupManager._global) {
					PopupManager._global = new PopupManager(window.document.body);
				}
				return PopupManager._global;
			},

		},

		/**
		 * PopupManager constructor.
		 * @param {DOMElement} container
		 */
		constructor : function (container) {
			this._container = container;
			this._popupInfo = null;
		},

		/**
		 * Show popup.
		 * @param  {AbstractPopup} popup
		 */
		show : function (popup) {
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

			this._popupInfo = {
				rootView : root,
				popup : popup,
			};

			popup.onShow();
		},

		/**
		 * Hide popup. If popup is not specified hide active popup.
		 * @param  {AbstractPopup} popup
		 */
		hide : function (popup) {
			if (this._popupInfo && (!popup || this._popupInfo.popup === popup)) {
				this._popupInfo.popup.onHide();
				this._container.removeChild(this._popupInfo.rootView);
				this._popupInfo = null;
			}
		},

	});

	module.exports = PopupManager;

});