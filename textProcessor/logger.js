const fs = require('fs'); 

const DEFAULT_LOG_PATH = "../log/textProcessor.log";

class Logger {
	
	constructor(loggingOption){
		if(loggingOption){
			this.mode = loggingOption[0];
			this.logPath = loggingOption[1] || DEFAULT_LOG_PATH;
		}
	}
	
	error (msg){
		if(isLogToFile(this.mode)){
			logToFile("[ERROR] "+msg, this.logPath);
		}
		
		if(isLogToConsole(this.mode)){
			logToConsole(" [ERROR] "+msg)
		}
	}
	
	info (msg){
		if(isLogToFile(this.mode)){
			logToFile("[INFO] "+msg, this.logPath);
		}
		if(isLogToConsole(this.mode)){
			logToConsole(" [INFO] "+msg);
		}
	}
	
}

function logToFile (msg, logFilePath){
	const logPath = logFilePath;
	fs.appendFile(logPath, new Date() + " " +msg + "\n", () => {/*do nothing*/}); 
}

function logToConsole(msg){
	console.log(new Date()+msg);
}

function isLogToFile(mode){
	return mode === 'log' || mode === 'logv';
}

function isLogToConsole(mode){
	return mode === 'verbose' || mode === 'logv';
}

module.exports = Logger;