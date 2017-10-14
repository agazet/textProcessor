'use strict';

const stream = require('stream');
const logger = require('./logger');

class TextReader extends stream.Transform{
	
	constructor() { 
	    super({objectMode: true}); 
	    this.textInfo = {
	    		sizeInBytes: 0,
	    		noOfLines: 0,
	    		elapsedTimeInMs: 0
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
			
			logger.info("Written to text reader"+"\n"+chunk
					+"\nsizeInBytes:     "+this.textInfo.sizeInBytes
					+"\nnoOfLines:       "+this.textInfo.noOfLines
					+"\nelapsedTimeInMs: "+this.textInfo.elapsedTimeInMs);
		}
		
		this.push(this.textInfo);
		
		callback();
	}
	
}

function countNoOfLines(chunk, encoding){
	//assuming no white characters in the beginning and end of stream
	return chunk.toString(encoding).trim().split(/\r\n|[\n\r\u0085\u2028\u2029]/g).length;
}

module.exports = TextReader;