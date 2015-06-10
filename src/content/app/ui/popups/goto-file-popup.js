define("content/app/ui/popups/goto-file-popup", function(require, exports, module) {

	// imports
	var constants = require("shared/constants");
	var KeyCodes = constants.KeyCodes;
	var DomEvents = constants.DomEvents;
	var Event = require("content/app/events/event");
	var EventDispatcher = require("content/app/events/event-dispatcher");
	var AbstractPopup = require("content/app/ui/popups/abstract-popup");

	/**
	 * Popup for getting file name from user.
	 */
	var GotoFilePopup = Class(AbstractPopup, {

		$statics : {
			DELAY_AUTOCOMPLETE : 0,
			INDEX_SEARCH_KEY : 1,
		},

		/**
		 * GotoFilePopup constructor.
		 * @param 	{GotoFilePopupEntry[]} 		Array of entries.
		 */
		constructor : function (entries) {
			GotoFilePopup.$super.call(this);

			this._entries = entries;
			this._fuzzySet = null;

			this._$input = null;
			this._onBlurHandler = this._onBlur.bind(this);
			this._onKeyUpHandler = this._onKeyUp.bind(this);

			this._init();
		},

		/**
		 * Current selected entry.
		 * @type {GotoFilePopupEntry}
		 */
		selectedEntry : {
			get : function() {
				var inputValue = this._$input.val();
				var selectedEntry = null;
				var entries = this._entries;

				for (var i = 0; i < entries.length; i++) {
					if (inputValue === entries[i].toString()) {
						selectedEntry = entries[i];
						break;
					}
				}

				return selectedEntry;
			}
		},

		/**
		 * Override. Method called when popup is shown.
		 */
		onShow : function () {
			this._$view.on(DomEvents.FOCUS_OUT, this._onBlurHandler);
			this._$input.on(DomEvents.KEY_UP, this._onKeyUpHandler);
			this._$input.focus();
		},

		/**
		 * Override. Method called when popup is hidden.
		 */
		onHide : function () {
			this._$view.off(DomEvents.FOCUS_OUT, this._onBlurHandler);
			this._$input.off(DomEvents.KEY_UP, this._onKeyUpHandler);
		},

		/**
		 * Init popup.
		 */
		_init : function () {

			// Fuzzy set
			this._fuzzySet = new FuzzySet();
			this._entries.forEach(function(entry) {
				this._fuzzySet.add( entry.toString() );
			}, this);

			// create input
			var input = document.createElement('input');
			this._$input = $(input);
			this._$input.prop('type', 'text');
			this._$input.addClass( 'popup-goto-file-input' );
			this._$view.append( this._$input );

			// create label
			var label = document.createElement('div');
			label.className = 'popup-goto-file-label';
			this._$view.append(label);

			// init jquery autocomplete widget
			this._$input.autocomplete({
				source : this._autoCompleteCallback.bind(this),
				delay : GotoFilePopup.DELAY_AUTOCOMPLETE,
			});

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
			var event = new Event(Event.SUBMIT, this.selectedEntry);
			this.trigger(event);
		},

		/**
		 * Auto complete callback function used by popup.
		 * @param  {Object}   request     Query request object.
		 *   @config  {String} term    User query.
		 * @param  {Function} resultFunc  Function which accepts array of result strings.
		 */
		_autoCompleteCallback : function(request, resultFunc) {

			var autoCompleteResults = [];
			var searchResults = this._fuzzySet.get( request.term );

			if (searchResults) {
				autoCompleteResults = searchResults.map(function(result) {
					return result[ GotoFilePopup.INDEX_SEARCH_KEY ];
				});
			}

			resultFunc( autoCompleteResults );

		},

	});

	module.exports = GotoFilePopup;

});