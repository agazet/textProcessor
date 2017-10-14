const fs = require('fs');

module.exports.error = function (msg){
	logToFile("[ERROR] "+msg);
}

module.exports.info = function (msg){
	logToFile("[INFO] "+msg); 
}

function logToFile (msg){
	let logPath = "../log/textProcessor.log"
	fs.appendFile(logPath, new Date() + " " +msg + "\n", () => {/*do nothing*/}); 
}