'use strict';

const assert = require('assert');
const path = require('path');
const TextStatistics = require(path.resolve('./textProcessor/textStatistics')); //running tests with npm test. 
//const TextStatistics = require(path.resolve('../textReader/textStatistics')); //to run from test directory using <<node testRunner.js>> path has to be changed

let testsPassed = 0;

module.exports.isCorrectThroughput = function(){
	const textInfo = {
    		sizeInBytes: 20,
    		noOfLines: 1,
    		elapsedTimeInMs: 200
    };
	
	const expectedMessage = createTextStatisticsMessage(1, 100);

	testTextStatisticsMessage(textInfo, expectedMessage);
}

module.exports.isCorrectThroughputForZeros = function(){
	const textInfo = {
    		sizeInBytes: 0,
    		noOfLines: 0,
    		elapsedTimeInMs: 0
    };
	
	const expectedMessage = createTextStatisticsMessage(0, 0);

	testTextStatisticsMessage(textInfo, expectedMessage);
}

module.exports.isCorrectThroughputForZeros = function(){
	const textInfo = {
    		sizeInBytes: 300,
    		noOfLines: 7,
    		elapsedTimeInMs: 0
    };
	
	const expectedMessage = createTextStatisticsMessage(7, 300);

	testTextStatisticsMessage(textInfo, expectedMessage);
}

module.exports.throwsErrorForNull = function (){
	const textStatistics = new TextStatistics();
	assert.throws(
			() => {let text; textStatistics.write(text)},
			Error,
			"Didn't throw an error"
			);
	testsPassed++;
}

module.exports.throwsErrorForEmptyWrite = function (){
	const textStatistics = new TextStatistics();
	assert.throws(
			() => {textStatistics.write()},
			Error,
			"Didn't throw an error"
			);
	testsPassed++;
}

module.exports.isCorrectMsgForNull = function (){
	const textStatistics = new TextStatistics();
	assert.throws(
			() => {let text; textStatistics.write(text)},
			/Something wrong was written to the stream.../,//
			"Incorrect error message"
			);
	testsPassed++;
}

module.exports.testsPassed = function(){
	console.log(`\nAll text statistics' tests (${testsPassed}) passed`);
}

function assertTextStatisticsMessage(actualMessage, expectedMessage){
	assert.equal(actualMessage, expectedMessage, 
			"\nactual   => "+actualMessage+
			"expected => "+ expectedMessage);
}

function createTextStatisticsMessage(noOfLines, througputRate){
	return `Read ${noOfLines} lines. Throughput rate of the input stream ${througputRate} (bytes/sec)\n`;
}

function testTextStatisticsMessage(textInfo, expectedMessage){
	const textStatistics = new TextStatistics();
	textStatistics.write(textInfo);
	
	const actualMessage = textStatistics.read().toString();
	assertTextStatisticsMessage(actualMessage, expectedMessage);
	
	testsPassed++;
}