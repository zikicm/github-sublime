define("content/app/algo/three/fint-text-ranges-visitor", function(require, exports, module) {

	// imports
	var AbstractVisitor = require("content/app/algo/three/abstract-visitor");

	/**
	 * Visitor that collects all ranges of specified text in given DOM structure.
	 */
	var FindTextRangesVisitor = Class(AbstractVisitor, {

		/**
		 * FindTextRangesVisitor description.
		 * @param  {String} text
		 */
		constructor : function (text) {
			this._text = text;

			this._indicesInitialized = false;
			this._indices = [];
			this._nodeStartIndex = 0;
			this._processingRange = null;
			this._ranges = [];
		},

		/**
		 * List of collected renges.
		 * @type {Range[]}
		 */
		ranges : {
			get : function () {
				return this._ranges;
			},
		},

		/**
		 * Visit given tree node.
		 * @param  {Element} node
		 */
		visit : function (node) {
			// Init text indices on root node visit.
			this._initInidices(node);

			// Visit only text nodes.
			if (node.nodeType === HTMLElement.TEXT_NODE && node.textContent) {
				// Process head index in indices while possible
				while (this._processHeadIndex(node));
				// Prepare start index for next node
				this._nodeStartIndex = this._nodeStartIndex + node.textContent.length;
			}
		},

		/**
		 * Process head index in indices.
		 * That includes:
		 *   - Set range start if it is in this node.
		 *   - Set range end if it is in this node.
		 *   - If range end in this node add range to list of ranges.
		 * Return true if range ends in this node so processing of next range will
		 * be called on the same node. That covers situation when the one word
		 * is contained in this node 2 or more times.
		 * @param  {Element} node
		 * @return {Boolean}
		 */
		_processHeadIndex : function (node) {
			var rangeFinished = false;

			var textContent = node.textContent;
			var startIndex = this._nodeStartIndex;
			var endIndex = this._nodeStartIndex + textContent.length;

			var targetStart = this._indices[0];
			var targetEnd = targetStart + this._text.length;

			// Try to set range start
			if (startIndex <= targetStart && targetStart < endIndex) {
				this._processingRange = document.createRange();
				this._processingRange.setStart(node, targetStart - startIndex);
			}

			// Try to set range end
			if (startIndex < targetEnd && targetEnd <= endIndex) {
				this._processingRange.setEnd(node, targetEnd - startIndex);
				this._ranges.push(this._processingRange);
				this._processingRange = null;
				this._indices.shift();
				rangeFinished = true;
			}

			return rangeFinished;
		},

		/**
		 * Initialize indices list.
		 * Indices list contains start locations of searching text in
		 * text content of root node.
		 * @param  {Element} node 	Root node.
		 */
		_initInidices : function (node) {
			if (!this._indicesInitialized) {

				var textContent = node.textContent;

				var index = textContent.indexOf(this._text);
				while (index !== -1) {
					this._indices.push(index);
					index = textContent.indexOf(this._text, index + this._text.length);
				}

				this._indicesInitialized = true;
			}
		},

	});

	module.exports = FindTextRangesVisitor;

});