'use strict';

const stream = require('stream');
const logger = require('./logger');

class TextStatistics extends stream.Transform{
	
	constructor(loggingOptions) { 
	    super({writableObjectMode: true});
	    this.loggingOptions = loggingOptions;
	}
	
	_transform(textInfo, encoding, callback){
		
		if(textInfo == null){
			logger.error("Text statistics error: Something wrong was written to the stream...");
			throw new Error("Something wrong was written to the stream...");
		} else {
			
			const sizeInBytes = textInfo.sizeInBytes;
			const noOfLines = textInfo.noOfLines;
			let elapsedTimeInSec = textInfo.elapsedTimeInMs/1000;
			elapsedTimeInSec = elapsedTimeInSec == 0 ? 1 : elapsedTimeInSec;
			
			const growRate = sizeInBytes/elapsedTimeInSec;
			
			const textStatisticsMessage = `Read ${noOfLines} lines. Throughput rate of the input stream ${growRate} (bytes/sec)`;
			
			logInfo(this.loggingOptions, sizeInBytes, noOfLines, elapsedTimeInSec, textStatisticsMessage);
			
			this.push(textStatisticsMessage+"\n");
		}
		
		callback();
	}
}

function logInfo(loggingOptions, sizeInBytes, noOfLines, elapsedTimeInSec, textStatisticsMessage){
	console.log(loggingOptions);
	if(loggingOptions){
		
		const msg = "Logging text statistics"
			+"\nsizeInBytes:     "+sizeInBytes
			+"\nnoOfLines:       "+noOfLines
			+"\nelapsedTimeInSec "+elapsedTimeInSec
			+"\n" + textStatisticsMessage;
		const Logger = require('./logger');
		const logger = new Logger(loggingOptions);
		logger.info(msg, loggingOptions.logFilePath);
	}
	
}

module.exports = TextStatistics;