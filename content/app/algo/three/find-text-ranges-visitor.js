define("content/app/algo/three/fint-text-ranges-visitor", function(require, exports, module) {

	// imports
	var AbstractVisitor = require("content/app/algo/three/abstract-visitor");

	/**
	 *
	 */
	var FindTextRangesVisitor = Class(AbstractVisitor, {

		constructor : function (text) {
			this._text = text;
			this._initialized = false;
			this._indices = [];
			this._index = 0;
			this._range = null;
			this._ranges = [];
		},

		ranges : {
			get : function () {
				return this._ranges;
			},
		},

		extractChildren : function (node) {
			return node.childNodes;
		},

		visit : function (node) {
			this._initInidices(node);
			if (node.nodeType === HTMLElement.TEXT_NODE && node.textContent) {
				while (this._processHeadIndex(node));
				this._index = this._index + node.textContent.length;
			}
		},

		_processHeadIndex : function (node) {
			var rangeFinished = false;

			var textContent = node.textContent;
			var startIndex = this._index;
			var endIndex = this._index + textContent.length;

			var targetStart = this._indices[0];
			var targetEnd = targetStart + this._text.length;

			// Try to set range start
			if (startIndex <= targetStart && targetStart < endIndex) {
				this._range = document.createRange();
				this._range.setStart(node, targetStart - startIndex);
			}

			// Try to set range end
			if (startIndex < targetEnd && targetEnd <= endIndex) {
				this._range.setEnd(node, targetEnd - startIndex);
				this._ranges.push(this._range);
				this._range = null;
				this._indices.shift();
				rangeFinished = true;
			}

			return rangeFinished;
		},

		_initInidices : function (node) {
			if (!this._initialized) {
				var textContent = node.textContent;
				var index = textContent.indexOf(this._text);
				while (index !== -1) {
					this._indices.push(index);
					index = textContent.indexOf(this._text, index + this._text.length);
				}
				this._initialized = true;
			}
		},

	});

	module.exports = FindTextRangesVisitor;

});