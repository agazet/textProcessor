'use strict';

console.log("\n***********************************************************************");
const textReader = require('./textReader');

for(let testFunc in textReader){
	textReader[testFunc]();
}

console.log("\n***********************************************************************");
const textStatistics = require('./textStatistics');

for(let testFunc in textStatistics){
	textStatistics[testFunc]();
}

console.log("\n***********************************************************************");
const textProcessor = require('./textProcessor');

for(let testFunc in textProcessor){
	textProcessor[testFunc]();
}