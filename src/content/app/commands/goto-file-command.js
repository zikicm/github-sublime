define("content/app/commands/goto-file-command", function(require, exports, module) {

	// imports
	var EventDispatcher = require("libs/events/event-dispatcher");
	var Event =require("libs/events/event");
	var PopupManager = require("content/app/ui/popup-manager");
	var GotoFilePopup = require("content/app/ui/popups/goto-file-popup");
	var GotoFilePopupEntry = require("content/app/ui/popups/goto-file-popup-entry");
	var AbstractCommand = require("content/app/commands/abstract-command");
	var CommitPageHelper = require("content/app/github/commit-page-helper");
	var WindowHelper = require("content/app/github/window-helper");

	/**
	 * This command is used for navigating used in current visible file.
	 */
	var GotoFileCommand = Class(AbstractCommand, {

		$statics : {
			MARGIN_TOP : 10,
		},

		/**
		 * GotoLineCommand constructor.
		 */
		constructor : function () {

			GotoFileCommand.$super.call(this);

			this._popup = null;

			this._onSubmitHandler = this._onSubmit.bind(this);
			this._onCloseHandler = this._onClose.bind(this);

		},

		/**
		 * Override. Run command.
		 */
		run : function () {
		  
			var fileWrappers = CommitPageHelper.getAllFiles();
			var popupEntries = fileWrappers.map(function(wrapper) {
				return new GotoFilePopupEntry( wrapper );
			});

			this._popup = new GotoFilePopup( popupEntries );

			this._popup.on(Event.SUBMIT, this._onSubmitHandler);
			this._popup.on(Event.CLOSE, this._onCloseHandler);

			PopupManager.global().show(this._popup);

		},

		/**
		 * Override. Cancel command.
		 */
		cancel : function () {
			this._closePopup();
			this._triggerCancel();
			this._fileWrappers = null;
		},

		/**
		 * Close popup.
		 */
		_closePopup : function () {
			if (this._popup) {
				this._popup.off(Event.SUBMIT, this._onSubmitHandler);
				this._popup.off(Event.CLOSE, this._onCloseHandler);

				PopupManager.global().hide(this._popup);

				this._popup = null;
			}
		},

		/**
		 * Submit event listener on popup.
		 * @param  {Event} event
		 */
		_onSubmit : function (event) {
			this._closePopup();
			
			var popupEntry = event.data;
			if (popupEntry) {
				var hash = popupEntry.fileElementWrapper.hash;
				WindowHelper.navigateToHash(hash);
			}

			this._triggerComplete()
		},

		/**
		 * Close event listener on popup.
		 * @param  {Event} event
		 */
		_onClose : function (event) {
			this.cancel();
		},

		/**
		 * Trigger complete event.
		 */
		_triggerComplete : function () {
			var event = new Event(Event.COMPLETE);
			this.trigger(event);
		},

		/**
		 * Trigger cancel event.
		 */
		_triggerCancel : function () {
			var event = new Event(Event.CANCEL);
			this.trigger(event);
		},

	});

	module.exports = GotoFileCommand;

});