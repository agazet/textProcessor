'use strict';

const assert = require('assert');
const path = require('path');
const TextReader = require(path.resolve('./textProcessor/textReader')); //running tests with npm test

let passedTests = 0;

//no test for elapsed time since it's hardware specific and some info may be cached
module.exports.isLengthInBytesAndNoOfLinesCorrectForOneLine = function (){
	const text = "Hallo!";
	testOutput(text, 6, 1);
}

module.exports.isLengthInBytesAndNoOfLinesCorrectFor3Lines = function (){
	const text = "Hallo!\nMy name is Tony\nAnd yours?";
	testOutput(text, 33, 3);
}

module.exports.isLengthInBytesAndNoOfLinesCorrectForJapanese = function (){
	const text="ありがとう";
	testOutput(text, 15, 1);
}

module.exports.throwsErrorForEmptyString = function (){
	const textReader = new TextReader();
	assert.throws(
			() => {textReader.write()},
			Error,
			"Didn't throw an error"
			);
	passedTests++;
}

module.exports.isCorrectMsgForEmptyString = function (){
	const textReader = new TextReader();
	assert.throws(
			() => {textReader.write()},
			/Empty string!/,//
			"Incorrect empty string message"
			);
	passedTests++;
}

module.exports.isLengthInBytesAndNoOfLinesCorrectForNewLine = function (){
	const text = "Hallo!\n"
	testOutput(text, 7, 1);
}

module.exports.passedTests = function(){
	console.log(`\nAll text reader's tests (${passedTests}) passed`);
}

function assertEqual(actual, expected, errorMessage){
	assert.equal(actual, expected, `\nText:\n${errorMessage}: expected ${expected}, actual ${actual}`);
}

function testOutput(text, expectedSizeInBytes, expectedNoOfLines){
	const textReader = new TextReader();
	textReader.write(text);
	assertEqual(textReader.textInfo.sizeInBytes, expectedSizeInBytes, text + " size in bytes");
	assertEqual(textReader.textInfo.noOfLines, expectedNoOfLines, text + " no of lines" );
	passedTests++;
}