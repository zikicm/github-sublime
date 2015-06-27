define("libs/text-selection/text-selection", function(require, exports, module) {

	// imports

	/**
	 * Text selection data holder.
	 */
	var TextSelection = Class(Object, {

		$statics : {

			/**
			 * Create TextSelection from Selection instance.
			 * @param  {Selection} selection
			 */
			createFromSelection : function (selection) {
				var ranges = [];

				for (var i = 0; i < selection.rangeCount; i++) {
					ranges.push(selection.getRangeAt(i));
				}

				return new TextSelection(ranges);
			},

		},

		/**
		 * TextSelection constructor.
		 * @param  {Range[]} ranges
		 */
		constructor : function (ranges) {
			this._ranges = ranges || [];
		},

		/**
		 * Selected ranges.
		 * @type {Range[]}
		 */
		ranges : {
			get : function () {
				return this._ranges;
			},
		},

		/**
		 * Selection first range.
		 * @type {Range}
		 */
		startRange : {
			get : function () {
				return this._ranges[0];
			},
		},

		/**
		 * Selection last range.
		 * @type {Range}
		 */
		endRange : {
			get : function () {
				return this._ranges[this._ranges.length - 1];
			},
		},

		/**
		 * Check if provided range is equal to this range.
		 * @param  {TextSelection} textSelection
		 * @return {Boolean}
		 */
		equalTo : function (textSelection) {
			var equal = true;

			if (this.ranges.length !== textSelection.ranges.length) {
				equal = false;
			}

			if (equal && this.ranges.length > 0) {
				equal = this.startRange.startContainer === textSelection.startRange.startContainer &&
						this.startRange.startOffset === textSelection.startRange.startOffset &&
						this.endRange.endContainer === textSelection.endRange.endContainer &&
						this.endRange.endOffset === textSelection.endRange.endOffset;
			}

			return equal;
		},

	});

	// export
	module.exports = TextSelection;

});
