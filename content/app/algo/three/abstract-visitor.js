define("content/app/algo/three/abstract-visitor", function(require, exports, module) {

	/**
	 * Defines visitor interface.
	 * Visitor is used by traversing.
	 */
	var AbstractVisitor = Class(Object, {

		/**
		 * AbstractVisitor constructor.
		 */
		constructor : function () {
		},

		/**
		 * Extract child nodes from provided node.
		 * As traversing can be used for any model type,
		 * visitor takes care of specific model type.
		 * @param  {Object} node
		 * @return {Object[]}
		 */
		extractChildren : function (node) {
			throw new Error("Not implemented!");
		},

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
