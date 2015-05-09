define("content/app/github/wrappers/dom-element-wrapper", function(require, exports, module) {

	// imports
	var Box = require("content/app/models/box");
	var WindowHelper = require("content/app/github/window-helper");

	/**
	 * Wrapper for any DOM element.
	 */
	var DomElementWrapper = Class(Object, {

		/**
		 * Constructor.
		 * @param  {Element} domElement
		 */
		constructor : function (domElement) {
			this._domElement = domElement;
		},

		/**
		 * Bounding box of DOM element relative to viewport top-left corner.
		 * @type {Box}
		 */
		clientBoundingBox : {
			get : function () {
				var clientRect = this._domElement.getBoundingClientRect();
				return Box.createFromClientRect(clientRect);
			},
		},

		/**
		 * Bounding box of DOM element relative to document.
		 * @type {Box}
		 */
		boundingBox : {
			get : function () {
				var clientBBox = this.clientBoundingBox;
				var viewport = WindowHelper.getViewportBoundingBox();
				clientBBox.translate(viewport.left, viewport.top);
				return clientBBox;
			},
		},

		/**
		 * Is DOM element in current viewport.
		 * @type {Boolean}
		 */
		isInViewport : {
			get : function () {
				var clientBBox = this.clientBoundingBox;
				var clientViewport = WindowHelper.getViewportClientBoundingBox();
				return (clientBBox.intersection(clientViewport) !== null);
			},
		},

	});

	module.exports = DomElementWrapper;

});