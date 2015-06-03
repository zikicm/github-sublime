define("content/app/algo/three/traversing", function(require, exports, module) {

	/**
	 * Utility for traversing three structure.
	 * It is type independent. Visitor should be
	 * implemented for specific type.
	 */
	var Traversing = Class(Object, {

		$statics : {

			/**
			 * Traverse element with provided visitor.
			 * @param  {Object} 			element
			 * @param  {AbstractVisitor} 	visitor
			 */
			traverse : function (element, visitor) {
				if (element) {
					visitor.visit(element);
					var children = visitor.extractChildren(element);
					Traversing.traverseList(children, visitor);
				}
			},

			/**
			 * Traverse list of elements with provided visitor.
			 * @param  {Object[]} 			elements
			 * @param  {AbstractVisitor} 	visitor
			 */
			traverseList : function (elements, visitor) {
				if (elements) {
					for (var i = 0; i < elements.length; i++) {
						var element = elements[i];
						Traversing.traverse(element, visitor);
					}
				}
			},

		},

		/**
		 * Traversing constructor.
		 * @param  {Object} element
		 */
		constructor : function (element) {
			this._element = element;
		},

		/**
		 * Traverse element provided through constructor.
		 * @param  {AbstractVisitor} visitor
		 */
		traverse : function (visitor) {
			Traversing.traverse(this._element, visitor);
		},

	});

	module.exports = Traversing;

});