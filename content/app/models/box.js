define("content/app/models/box", function(require, exports, module) {

	// imports
	var Point = require("content/app/models/point");

	/**
	 * Box model.
	 */
	var Box = Class(Object, {

		$statics : {

			/**
			 * Create Box instance from ClientRect.
			 * @param  {ClientRect} clientRect
			 * @return {Box}
			 */
			createFromClientRect : function (clientRect) {
				return new Box(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
			},

		},

		/**
		 * Box constructor.
		 * @param  {Number} left
		 * @param  {Number} top
		 * @param  {Number} width
		 * @param  {Number} height
		 */
		constructor : function (left, top, width, height) {
			this._left = left;
			this._top = top;
			this._width = width;
			this._height = height;
		},

		/**
		 * Left position.
		 * @type {Number}
		 */
		left : {
			get : function () {
				return this._left;
			},
		},

		/**
		 * Top position.
		 * @type {Number}
		 */
		top : {
			get : function () {
				return this._top;
			},
		},

		/**
		 * Box width.
		 * @type {Number}
		 */
		width : {
			get : function () {
				return this._width;
			},
		},

		/**
		 * Box height.
		 * @type {Number}
		 */
		height : {
			get : function () {
				return this._height;
			},
		},

		/**
		 * Right position.
		 * @type {Number}
		 */
		right : {
			get : function () {
				return this._left + this._width;
			},
		},

		/**
		 * Bottom position.
		 * @type {Number}
		 */
		bottom : {
			get : function () {
				return this._top + this._height;
			},
		},

		/**
		 * Box area.
		 * @type {Number}
		 */
		area : {
			get : function () {
				return this._width * this._height;
			},
		},

		/**
		 * Center point.
		 * @type {Point}
		 */
		center : {
			get : function () {
				var x = this._left + this._width / 2;
				var y = this._top + this._height / 2;
				return new Point(x, y);
			},
		},

		/**
		 * Translate current box.
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {Box}
		 */
		translate : function (x, y) {
			this._left += x;
			this._top += y;
		},

		/**
		 * Move current box.
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {Box}
		 */
		move : function (x, y) {
			this._left = x;
			this._top = y;
		},

		/**
		 * Get intersection box between boxes.
		 * @param  {Box} box Another box.
		 * @return {Box}     Intersection.
		 */
		intersection : function (box) {
			var left = Math.max(this.left, box.left);
			var top = Math.max(this.top, box.top);
			var right = Math.min(this.right, box.right);
			var bottom = Math.min(this.bottom, box.bottom);

			var intersection = null;
			if (left < right && top < bottom) {
				intersection = new Box(left, top, right - left, bottom - top);
			}

			return intersection;
		},

		/**
		 * Check if box contains point.
		 * @param  {Point} point
		 * @return {Boolean}
		 */
		containsPoint : function (point) {
			return (this.left <= point.x &&
					this.top <= point.y &&
					this.right >= point.x &&
					this.bottom >= point.y);
		},

		/**
		 * Get closest point in box to provided point.
		 * @param  {Point} point
		 * @return {Point}
		 */
		closestPoint : function (point) {
			var x = Math.min(Math.max(point.x, this.left), this.right);
			var y = Math.min(Math.max(point.y, this.top), this.bottom);
			return new Point(x, y);
		},

		/**
		 * Distance to point. If point is in Box, then distance is 0.
		 * @param  {Point} point
		 * @return {Number}
		 */
		distanceToPoint : function (point) {
			var closestPoint = this.closestPoint(point);
			return closestPoint.distanceToPoint(point);
		},

	});

	module.exports = Box;

});