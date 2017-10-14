const fs = require('fs');

class Logger {
	
	constructor(loggingOptions){
		this.loggingOptions = loggingOptions;
	}
	
	error (msg){
		if(this.loggingOptions.log){
			logToFile("[ERROR] "+msg, this.loggingOptions.logFilePath);
		}
		if(this.loggingOptions.verbose){
			console.log(new Date()+ " [ERROR] "+msg)
		}
	}
	
	info (msg){
		if(this.loggingOptions.logToFile){
			logToFile("[INFO] "+msg, this.loggingOptions.logFilePath);
		}
		if(this.loggingOptions.verbose){
			console.log(new Date()+ " [INFO] "+msg)
		}
	}
	
}

function logToFile (msg, logFilePath){
	const logPath = logFilePath || "../log/textProcessor.log";
	fs.appendFile(logPath, new Date() + " " +msg + "\n", () => {/*do nothing*/}); 
}

module.exports = Logger;