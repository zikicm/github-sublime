define("content/app/models/box", function(require, exports, module) {

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
		 * @param  {Number} top    [description]
		 * @param  {Number} width  [description]
		 * @param  {Number} height [description]
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
		 * Get new bounding box that is translation of current.
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {Box}
		 */
		translate : function (x, y) {
			return new Box(this.left + x, this.top + y, this.width, this.height);
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

	});

	module.exports = Box;

});