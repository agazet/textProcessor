'use strict';

const stream = require('stream');

class TextReader extends stream.Transform{
	
	constructor(loggingOption) { 
	    super({objectMode: true}); 
	    this.textInfo = {
	    		sizeInBytes: 0,
	    		noOfLines: 0,
	    		elapsedTimeInMs: 0,
	    		loggingOption: loggingOption
	    
	    };
	    this.startTime = new Date();
	  }
	
	_transform(chunk, encoding, callback){
		
		if(chunk == null){
			const logger = getLogger(this.textInfo);
			logger.error("Text reader error: Empty string!");
			throw new Error("Empty string!");
		} else {
			this.textInfo.noOfLines += countLines(chunk, encoding);
			this.textInfo.sizeInBytes += Buffer.byteLength(chunk, encoding);
			this.textInfo.elapsedTimeInMs = new Date() - this.startTime;
			
			logInfo(chunk, this.textInfo);
		}
		
		this.push(this.textInfo);
		
		callback();
	}
	
}

function countLines(chunk, encoding){
	//assuming no white characters in the beginning and end of stream
	return chunk.toString(encoding).trim().split(/\r\n|[\n\r\u0085\u2028\u2029]/g).length;
}

function logInfo(chunk, textInfo){
	if(textInfo.loggingOption){
		
		const msg = "Written to text reader"+"\n"+chunk
			+"\nsizeInBytes:     "+textInfo.sizeInBytes
			+"\nnoOfLines:       "+textInfo.noOfLines
			+"\nelapsedTimeInMs: "+textInfo.elapsedTimeInMs;

		;
		const logger = getLogger(textInfo);
		logger.info(msg, textInfo.loggingOption.logFilePath);
	}
	
}

function getLogger(textInfo){
	const Logger = require('./logger');
	return new Logger(textInfo.loggingOption)
}

module.exports = TextReader;