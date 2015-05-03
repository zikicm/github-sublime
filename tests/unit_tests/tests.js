var test = QUnit.test;

test("Hello test", function(assert) {
  assert.ok( 1 === 1, "Passed!" );
});

// Define.js

test("Define.js: Module define / require", function(assert) {

	define("someLib/testModuleA", function(require, exports, module) {

		module.exports = function() {
			return 1;
		}

	});

	define("otherLib/testModuleB", function(require, exports, module) {

		var testFunc = require("someLib/testModuleA");
		assert.ok(1 === testFunc(), "Passed!");

	});

});

test("Define.js: Exception on require of undefined module", function(assert) {

	var moduleName = "someLib/testModuleC";
	var moduleFunc = function(require, exports, module) {
		require("someLib/someUndefinedModule");
	}
	var moduleDefine = define.bind(null, moduleName, moduleFunc);

	assert.throws(
		moduleDefine, // Block which should throw exception
		new Error("Module someLib/someUndefinedModule not defined!"), // Expected exception
		"Passed!");

});

test("Define.js: Exception on defining already defined", function(assert) {

	define("someLib/existingModule", function() {});

	var moduleName = "someLib/existingModule";
	var moduleFunc = function() {}
	var moduleDefine = define.bind(null, moduleName, moduleFunc);

	assert.throws(
		moduleDefine, // Block which should throw exception
		new Error("Module someLib/existingModule already defined!"), // Expected exception
		"Passed!");

});