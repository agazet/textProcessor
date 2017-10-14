'use strict';

const TextReader = require('./textReader');
const TextStatistics = require('./textStatistics');

let loggingOptions;

const argv = process.argv;

function Options(verbose, logToFile, logFilePath){
	this.verbose = verbose;
	this.logToFile = logToFile;
	this.logFilePath = logFilePath;
}

switch (argv[2]){
case 'verbose':
	console.log("Logging to console");
	loggingOptions = new Options(true);
	break;
case 'log':
	console.log("Logging to file (default) {project directory}/log/textProcessor.log");
	loggingOptions = new Options(false, true);
	break;
case 'logv':
	console.log("Logging to console & file " + argv[3]);
	loggingOptions = new Options(true, true, argv[3]);
	break;
case 'logTo':
	console.log("Logging to " + argv[3]);
	loggingOptions = new Options(false, true, argv[3]);
	break;
case 'help':
	console.log("No help :p");
	break;
default:
	console.log("No logging, for more info type help");
}

console.log(loggingOptions + " run");

const textReader = new TextReader(loggingOptions);
const textStatistics = new TextStatistics(loggingOptions);

process.stdin.pipe(textReader).pipe(textStatistics).pipe(process.stdout);