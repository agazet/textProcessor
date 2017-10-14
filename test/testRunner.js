'use strict';

const textReaderTests = require('./textReaderTests');

console.log("\n***********************************************************************");
for(let testFunc in textReaderTests){
	textReaderTests[testFunc]();
}

console.log("\n***********************************************************************");
const textStatisticsTests = require('./textStatisticsTest');

for(let testFunc in textStatisticsTests){
	textStatisticsTests[testFunc]();
}

console.log("\n***********************************************************************");