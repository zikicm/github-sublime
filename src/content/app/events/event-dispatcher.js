define("content/app/events/event-dispatcher", function(require, exports, module) {

	/**
	 * Class that dispatches events.
	 */
	var EventDispatcher = Class({

		/**
		 * EventDispatcher constructor
		 * @param {Object} 	target 	Optional. Reference to source of dispatched events.
		 */
		constructor : function (target) {
			this._target = target || this;
			this._callbacks = {};
		},

		/**
		 * Add event listener.
		 * @param  {String}   type     	Event type.
		 * @param  {Function} callback 	Listener function.
		 */
		on : function (type, callback) {
			var list = this._callbacks[type];
			if (!list) {
				list = this._callbacks[type] = [];
			}
			list.push(callback);
		},

		/**
		 * Remove event listener.
		 * @param  {String}   type     	Event type.
		 * @param  {Function} callback 	Listener function.
		 */
		off : function (type, callback) {
			var list = this._callbacks[type];
			if (list) {
				var index = list.indexOf(callback);
				if (index !== -1) {
					list.splice(index, 1);
				}
			}
		},

		/**
		 * Trigger event.
		 * @param  {Event} event
		 */
		trigger : function (event) {
			var list = this._callbacks[event.type];
			if (list) {
				event.target = this._target;
				for (var i = 0; i < list.length; i++) {
					list[i].call(window, event);
				}
			}
		},

	});

	module.exports = EventDispatcher;

});