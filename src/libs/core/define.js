// In order to make our code structured, modular and reusable
// throught the project, we close our modules (classes) in function scopes.
// Having explicit define / require relationship between modules
// enforces tree like dependencies and avoids circular ones.
// The same principal is used in NodeJS.

(function(window){

	// Maps namespace to module
	var _moduleMap = {};

	// Fetches exports from module based on module's namespace
	var require = function(namespace) {

		if (!_moduleMap[namespace]) {
			throw new Error("Module " + namespace + " not defined!");
		}

		return _moduleMap[namespace].exports;

	};

	// Global function used for defining of namespaces
	window.define = function(namespace, moduleFunc) {

		if (_moduleMap[namespace]) {
			throw new Error("Module " + namespace + " already defined!");
		}

		var module = {
			exports : {}
		};

		_moduleMap[namespace] = module;

		moduleFunc(require, module.exports, module);

	}

})(window);