define("libs/events/event", function(require, exports, module) {

	/**
	 * Event class used by dispatcher.
	 */
	var Event = Class({

		$statics : {

			/**
			 * Close event type.
			 * @type {String}
			 */
			CLOSE : 'close',

			/**
			 * Submit event type.
			 * @type {String}
			 */
			SUBMIT : 'submit',

			/**
			 * Complete event type.
			 * @type {String}
			 */
			COMPLETE : 'complete',

			/**
			 * Cancel event type.
			 * @type {String}
			 */
			CANCEL : 'cancel',

			/**
			 * Select event type.
			 * @type {String}
			 */
			SELECT : 'select',
		},

		/**
		 * Event constructor.
		 * @param {String} type
		 * @param {Object} data
		 */
		constructor : function (type, data) {
			this._type = type;
			this._data = data;
			this._target = null;
		},

		/**
		 * Event type.
		 * @type {String}
		 */
		type : {
			get : function () {
				return this._type;
			}
		},

		/**
		 * Data passed with event from dispatcher.
		 * @type {Object}
		 */
		data : {
			get : function () {
				return this._data;
			}
		},

		/**
		 * Event sender. In most cases it will be subclass of EventDispatcher.
		 * @type {Object}
		 */
		target : {
			get : function () {
				return this._target;
			},
			set : function (value) {
				this._target = value;
			},
		},

	});

	module.exports = Event;

});