define("content/app/algo/three/abstract-visitor", function(require, exports, module) {

	/**
	 * Abstract visitor that defines visitor interface.
	 */
	var AbstractVisitor = Class(Object, {

		constructor : function () {
		},

		extractChildren : function (node) {
			throw new Error("Not implemented!");
		},

		visit : function (node) {
			throw new Error("Not implemented!");
		},

	});

	module.exports = AbstractVisitor;

});