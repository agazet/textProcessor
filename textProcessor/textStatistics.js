'use strict';

const stream = require('stream');
const logger = require('./logger');

class TextStatistics extends stream.Transform{
	
	constructor() { 
	    super({writableObjectMode: true}); 
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
			
			const textStatisticsMessage = `Read ${noOfLines} lines. Throughput rate of the input stream ${growRate} (bytes/sec)`
			
			logger.info("Logging text statistics"
					+"\nsizeInBytes:     "+sizeInBytes
					+"\nnoOfLines:       "+noOfLines
					+"\nelapsedTimeInSec "+elapsedTimeInSec
					+"\n" + textStatisticsMessage);
			
			this.push(textStatisticsMessage+"\n");
		}
		
		callback();
	}
}

module.exports = TextStatistics;