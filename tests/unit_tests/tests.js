var test = QUnit.test;

define("testModule", function(require, exports, module) {

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

test("Content models: FilePath", function(assert) {

	var FilePath = require('content/app/models/file-path');

	// Standard scenario
	var standardCase = new FilePath("a/b/c/someFile.bin");
	assert.ok(standardCase.name === "someFile", "Standard scenario: file name");
	assert.ok(standardCase.extension === "bin", "Standard scenario: file name");
	assert.ok(standardCase.nameWithExt === "someFile.bin", "Standard scenario: name + extension");
	assert.ok(standardCase.path === "a/b/c/someFile.bin", "Standard scenario: full path");
	assert.ok(standardCase.dirname === "a", "Standard scenario: dirname")

	var pathSegments = standardCase.segments;
	var expectedSegments = ['a', 'b', 'c', 'someFile.bin'];
	assert.deepEqual(pathSegments, expectedSegments);

	// Scenarion where file does not have path, just name + ext
	var simpleCase = new FilePath("manifest.json");
	assert.ok(simpleCase.name === "manifest", "Simple scenario: file name");
	assert.ok(simpleCase.extension === "json", "Simple scenario: file name");
	assert.ok(simpleCase.nameWithExt === "manifest.json", "Simple scenario: name + extension");
	assert.ok(simpleCase.path === "manifest.json", "Simple scenario: full path");
	assert.ok(simpleCase.segments.length === 1, "Simple scenario: path segments");
	assert.ok(simpleCase.dirname === null, "Standard scenario: dirname")

});


});