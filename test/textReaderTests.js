'use strict';

const assert = require('assert');
const path = require('path');
const TextReader = require(path.resolve('./textProcessor/textReader')); //running tests with npm test. 
//const TextReader = require(path.resolve('../textReader/textReader')); //to run from test directory using <<node testRunner.js>> path has to be changed

let testsPassed = 0;

//no test for elapsed time since it's hardware specific and some info may be cached
module.exports.isLengthInBytesAndNoOfLinesCorrectForOneLine = function (){
	const text = "Hallo!";
	testTextReader(text, 6, 1);
}

module.exports.isLengthInBytesAndNoOfLinesCorrectFor3Lines = function (){
	const text = "Hallo!\nMy name is Tony\nAnd yours?";
	testTextReader(text, 33, 3);
}

module.exports.isLengthInBytesAndNoOfLinesCorrectForJapanese = function (){
	const text="ありがとう";
	testTextReader(text, 15, 1);
}

module.exports.throwsErrorForEmptyString = function (){
	const textReader = new TextReader();
	assert.throws(
			() => {textReader.write()},
			Error,
			"Didn't throw an error"
			);
	testsPassed++;
}

module.exports.isCorrectMsgForEmptyString = function (){
	const textReader = new TextReader();
	assert.throws(
			() => {textReader.write()},
			/Empty string!/,//
			"Incorrect empty string message"
			);
	testsPassed++;
}

module.exports.isLengthInBytesAndNoOfLinesCorrectForNewLine = function (){
	const text = "Hallo!\n"
	testTextReader(text, 7, 1);
}

module.exports.testsPassed = function(){
	console.log(`\nAll text reader's tests (${testsPassed}) passed`);
}

function assertEqual(actual, expected, errorMessage){
	assert.equal(actual, expected, `\nText:\n${errorMessage}: expected ${expected}, actual ${actual}`);
}

function testTextReader(text, expectedSizeInBytes, expectedNoOfLines){
	const textReader = new TextReader();
	textReader.write(text);
	assertEqual(textReader.textInfo.sizeInBytes, expectedSizeInBytes, text + " size in bytes");
	assertEqual(textReader.textInfo.noOfLines, expectedNoOfLines, text + " no of lines" );
	testsPassed++;
}