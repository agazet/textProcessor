'use strict';

const stream = require('stream');

class TextStatistics extends stream.Transform{
	
	constructor(loggingOption) { 
	    super({writableObjectMode: true});
	    if(loggingOption){
	    	const logger = require('./logger');
	    	this.loggingOption = loggingOption;
	    }
	}
	
	_transform(textInfo, encoding, callback){
		
		if(textInfo == null){
			const logger = getLogger(this.loggingOption);
			logger.error("Text statistics error: Something wrong was written to the stream...");
			throw new Error("Something wrong was written to the stream...");
		} else {
			
			const sizeInBytes = textInfo.sizeInBytes;
			const noOfLines = textInfo.noOfLines;
			let elapsedTimeInSec = textInfo.elapsedTimeInMs/1000;
			elapsedTimeInSec = elapsedTimeInSec == 0 ? 1 : elapsedTimeInSec;
			
			const growRate = sizeInBytes/elapsedTimeInSec;
			
			const textStatisticsMessage = `Read ${noOfLines} lines. Text grow rate ${growRate} (bytes/sec)`;
			
			logInfo(this.loggingOption, sizeInBytes, noOfLines, elapsedTimeInSec, textStatisticsMessage);
			
			this.push(textStatisticsMessage+"\n");
		}
		
		callback();
	}
}

function logInfo(loggingOption, sizeInBytes, noOfLines, elapsedTimeInSec, textStatisticsMessage){
	if(loggingOption){
		
		const msg = "Logging text statistics"
			+"\nsizeInBytes:     "+sizeInBytes
			+"\nnoOfLines:       "+noOfLines
			+"\nelapsedTimeInSec "+elapsedTimeInSec
			+"\n" + textStatisticsMessage;
		const logger = getLogger(loggingOption);
		logger.info(msg, loggingOption.logFilePath);
	}
	
}

function getLogger(loggingOption){
	const Logger = require('./logger');
	return new Logger(loggingOption)
}


module.exports = TextStatistics;