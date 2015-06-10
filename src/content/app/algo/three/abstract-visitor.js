define("content/app/algo/three/abstract-visitor", function(require, exports, module) {

	/**
	 * Defines visitor interface.
	 * Visitor is used by traversing.
	 */
	var AbstractVisitor = Class(Object, {

		/**
		 * Visit provided node.
		 * @param  {Object} node
		 */
		visit : function (node) {
			throw new Error("Not implemented!");
		},

	});


	module.exports = AbstractVisitor;

});
