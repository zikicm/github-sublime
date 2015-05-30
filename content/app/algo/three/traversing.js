define("content/app/algo/three/traversing", function(require, exports, module) {

	/**
	 *
	 */
	var Traversing = Class(Object, {

		$statics : {

			traverse : function (element, visitor) {
				if (element) {
					visitor.visit(element);
					var children = visitor.extractChildren(element);
					Traversing.traverseList(children, visitor);
				}
			},

			traverseList : function (elements, visitor) {
				if (elements) {
					for (var i = 0; i < elements.length; i++) {
						var element = elements[i];
						Traversing.traverse(element, visitor);
					}
				}
			},

		},

		constructor : function (element) {
			this._element = element;
		},

		traverse : function (visitor) {
			Traversing.traverse(this._element, visitor);
		},

	});

	module.exports = Traversing;

});