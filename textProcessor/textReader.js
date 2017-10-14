'use strict';

const stream = require('stream');

class TextReader extends stream.Transform{
	
	constructor(loggingOptions) { 
	    super({objectMode: true}); 
	    this.textInfo = {
	    		sizeInBytes: 0,
	    		noOfLines: 0,
	    		elapsedTimeInMs: 0,
	    		loggingOptions: loggingOptions
	    
	    };
	    this.startTime = new Date();
	  }
	
	_transform(chunk, encoding, callback){
		
		if(chunk == null){
			logger.error("Text reader error: Empty string!");
			throw new Error("Empty string!");
		} else {
			this.textInfo.noOfLines += countNoOfLines(chunk, encoding);
			this.textInfo.sizeInBytes += Buffer.byteLength(chunk, encoding);
			this.textInfo.elapsedTimeInMs = new Date() - this.startTime;
			logInfo(chunk, this.textInfo);
		}
		
		this.push(this.textInfo);
		
		callback();
	}
	
}

function countNoOfLines(chunk, encoding){
	//assuming no white characters in the beginning and end of stream
	return chunk.toString(encoding).trim().split(/\r\n|[\n\r\u0085\u2028\u2029]/g).length;
}

function logInfo(chunk, textInfo){
	console.log(textInfo.loggingOptions)
	if(textInfo.loggingOptions){
		
		const msg = "Written to text reader"+"\n"+chunk
			+"\nsizeInBytes:     "+textInfo.sizeInBytes
			+"\nnoOfLines:       "+textInfo.noOfLines
			+"\nelapsedTimeInMs: "+textInfo.elapsedTimeInMs;

		const Logger = require('./logger');
		const logger = new Logger(textInfo.loggingOptions);
		logger.info(msg, textInfo.loggingOptions.logFilePath);
	}
	
}

module.exports = TextReader;