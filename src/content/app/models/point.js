define("content/app/models/point", function(require, exports, module) {

	/**
	 * Point model.
	 */
	var Point = Class(Object, {

		/**
		 * Point constructor.
		 * @param  {Number} x
		 * @param  {Number} y
		 */
		constructor : function (x, y) {
			this._x = x;
			this._y = y;
		},

		/**
		 * X position.
		 * @type {Number}
		 */
		x : {
			get : function () {
				return this._x;
			},
		},

		/**
		 * Y position.
		 * @type {Number}
		 */
		y : {
			get : function () {
				return this._y;
			},
		},

		/**
		 * Distance to another point.
		 * @param  {Point} point
		 * @return {Number}
		 */
		distanceToPoint : function (point) {
			var x = this.x - point.x;
			var y = this.y - point.y;
			return Math.sqrt(x*x + y*y);
		},

	});

	module.exports = Point;

});