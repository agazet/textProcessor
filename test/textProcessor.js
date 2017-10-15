const assert = require('assert');
const path = require('path');
const TextProcessor = require(path.resolve("./textProcessor/textProcessor")); 

let passedTests=0;

module.exports.supportsLog = function(){
	assert(TextProcessor.isSupported(["log"]), "should support log");
	passedTests++;
}

module.exports.supportsLogToFile = function(){
	assert(TextProcessor.isSupported(["log", "tmp.log"]), "should support log + fileName.log");
	passedTests++;
}

module.exports.supportsEmpty = function(){
	assert(TextProcessor.isSupported([]), "should support no arguments");
	passedTests++;
}

module.exports.supportsHelp = function(){
	assert(TextProcessor.isSupported(["help"]), "should support help");
	passedTests++;
}

module.exports.supportsHelp = function(){
	assert(TextProcessor.isSupported(["logv"]), "should support logv");
	passedTests++;
}

module.exports.dontSupportHi = function(){
	assert.notEqual(TextProcessor.isSupported(["hi"]), "shouldn't support 'hi'");
	passedTests++;
}

module.exports.passedTests = function(){
	console.log(`\nAll text processor"s tests (${passedTests}) passed`);
}