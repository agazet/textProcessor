'use strict';

const textReader = require('./textReader');
runTests(textReader);

const textStatistics = require('./textStatistics');
runTests(textStatistics);

const textProcessor = require('./textProcessor');
runTests(textProcessor);


function runTests(module){
	console.log("\n**************************** start of test ****************************");
	
	for(let testFunc in module){
		module[testFunc]();
	}
	
	console.log("\n***************************** end of test *****************************");
}