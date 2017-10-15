'use strict';

const TextProcessor = require('./textProcessor');

const loggingOption = process.argv.slice(2);

if(TextProcessor.isSupported(loggingOption)){
	TextProcessor.run(loggingOption);
} else { 
	console.log("Unsupported action, for more info type help");
}