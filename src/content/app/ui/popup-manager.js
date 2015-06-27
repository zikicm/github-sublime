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
			this._$container = $(container);
			this._popupInfo = null;
		},

		/**
		 * Show popup.
		 * @param  {AbstractPopup} popup
		 */
		show : function (popup) {
			this.hide();

			var $root = $("<div></div>");
			$root.addClass("popup-root");
			this._$container.append($root);

			var $vertical = $("<div></div>");
			$vertical.addClass("popup-vertical-position");
			$root.append($vertical);

			var $horizontal = $("<div></div>");
			$horizontal.addClass("popup-horizontal-position");
			$vertical.append($horizontal);

			$horizontal.append(popup.$view);

			this._popupInfo = {
				$rootView : $root,
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
				this._popupInfo.$rootView.remove();
				this._popupInfo = null;
			}
		},

	});

	module.exports = PopupManager;

});